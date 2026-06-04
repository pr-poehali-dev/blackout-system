import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout, Code, Search, Target, BarChart2, Mail } from "lucide-react"

const services = [
  {
    icon: Layout,
    title: "Разработка сайтов",
    description:
      "Создаём современные сайты под ключ: лендинги, корпоративные сайты, интернет-магазины. Быстрая загрузка, адаптивный дизайн и удобная структура — всё для роста вашего бизнеса.",
  },
  {
    icon: Code,
    title: "Веб-разработка",
    description:
      "Разрабатываем технически сложные проекты: порталы, личные кабинеты, интеграции с CRM и платёжными системами. Масштабируемый код и надёжная архитектура.",
  },
  {
    icon: Search,
    title: "SEO-продвижение",
    description:
      "Выводим сайты в топ Google и Яндекс. Техническая оптимизация, работа с семантикой, ссылочная масса и контент — комплексный подход к органическому трафику.",
  },
  {
    icon: Target,
    title: "Контекстная реклама",
    description:
      "Настраиваем рекламные кампании в Яндекс.Директ и Google Ads. Привлекаем целевых клиентов с первого дня запуска при минимальной стоимости заявки.",
  },
  {
    icon: BarChart2,
    title: "Интернет-маркетинг",
    description:
      "Разрабатываем комплексные маркетинговые стратегии: аналитика, воронки продаж, A/B-тестирование. Измеримый результат и прозрачная отчётность.",
  },
  {
    icon: Mail,
    title: "SMM и email-маркетинг",
    description:
      "Ведём соцсети и создаём email-кампании, которые удерживают аудиторию и возвращают клиентов. Контент-стратегия, дизайн и аналитика включены.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mx-auto block w-fit">
          Наша экспертиза
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          В чем мы <span className="text-primary">сильны</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed text-lg">
          Полный цикл работ — от дизайна и разработки до SEO и рекламы. Берём задачу и доводим до измеримого результата.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}