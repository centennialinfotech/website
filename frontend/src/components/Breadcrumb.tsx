import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  link?: string
}

interface BreadcrumbProps {
  title: string
  items?: BreadcrumbItem[]
}

function Breadcrumb({ title, items = [] }: BreadcrumbProps) {
  return (
    <section className="breadcrumb-wrapper hero-page overflow-hidden bg-cover bg-blue">
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <div className="breadcrumb__link">
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>
                        {item.link ? <Link to={item.link}>{item.label}</Link> : item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h2 className="title">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Breadcrumb
