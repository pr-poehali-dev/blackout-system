import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Интернет-магазин строительных материалов",
    category: "Разработка + SEO",
    image: "/professional-corporate-website.png",
    description:
      "Разработали интернет-магазин с каталогом 5000+ позиций. SEO-продвижение вывело сайт в топ-3 по ключевым запросам за 4 месяца. Органический трафик вырос в 4 раза.",
    url: "#portfolio",
    tags: ["Разработка", "SEO", "Интернет-магазин"],
  },
  {
    title: "Лендинг для юридической компании",
    category: "Веб-дизайн и разработка",
    image: "/creative-portfolio-website.png",
    description:
      "Создали конверсионный лендинг с онлайн-записью на консультацию. Контекстная реклама в Яндекс.Директ снизила стоимость заявки в 2,5 раза.",
    url: "#portfolio",
    tags: ["Лендинг", "Контекстная реклама", "CRM"],
  },
  {
    title: "Корпоративный сайт ресторана",
    category: "Разработка + Маркетинг",
    image: "/restaurant-website-design.png",
    description:
      "Современный сайт с онлайн-меню, бронированием столиков и системой отзывов. SMM и email-маркетинг увеличили повторные визиты на 35%.",
    url: "#portfolio",
    tags: ["Разработка", "SMM", "Email-маркетинг"],
  },
  {
    title: "Интернет-магазин модной одежды",
    category: "E-commerce + SEO",
    image: "/modern-ecommerce-website.png",
    description:
      "Полноценный e-commerce проект с личным кабинетом, корзиной и интеграцией с 1С. Комплексное SEO обеспечило 60% заказов из органики уже через 6 месяцев.",
    url: "#portfolio",
    tags: ["E-commerce", "SEO", "1С-интеграция"],
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Наше портфолио</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Ознакомьтесь с подборкой наших последних проектов и узнайте, как мы помогаем бизнесу расти с помощью мощных цифровых решений.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => project.url !== "#portfolio" && window.open(project.url, "_blank")}
                  >
                    Открыть проект <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}