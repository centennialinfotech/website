import http.server
import socketserver
import os

PORT = 5500

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Strip query parameters for the file path check
        path_without_query = self.path.split('?')[0]
        
        # Handle /home to index.html mapping
        if path_without_query == '/home':
            self.path = self.path.replace('/home', '/index.html', 1)
            
        # If the requested path has no extension and isn't a directory, check if .html exists
        elif path_without_query != '/' and not os.path.splitext(path_without_query)[1]:
            local_path = self.translate_path(path_without_query)
            if not os.path.isdir(local_path) and os.path.exists(local_path + '.html'):
                # Modify self.path to include .html before calling the superclass
                # so that SimpleHTTPRequestHandler serves the .html file
                if '?' in self.path:
                    self.path = self.path.replace('?', '.html?', 1)
                else:
                    self.path += '.html'
                
        return super().do_GET()

Handler = CleanURLHandler
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Clean URLs enabled (e.g., /aboutus -> aboutus.html)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
