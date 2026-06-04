import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

const SEND_EMAIL_URL = "https://functions.poehali.dev/a7f439f7-680f-4dfe-8671-87d5effc45e9"

interface QuoteFormDialogProps {
  packageName?: string
  variant?: "default" | "outline"
  className?: string
  children?: React.ReactNode
}

export function QuoteFormDialog({ packageName, variant = "default", className, children }: QuoteFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    package: packageName || "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const res = await fetch(SEND_EMAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, source: `Тариф: ${formData.package || "не выбран"}` }),
    })
    if (res.ok) {
      setStatus("success")
    } else {
      setStatus("error")
    }
  }

  const handleClose = (val: boolean) => {
    setOpen(val)
    if (!val) {
      setStatus("idle")
      setFormData({ name: "", email: "", phone: "", company: "", package: packageName || "", message: "" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {children || "Запросить расчет"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Запросить расчет</DialogTitle>
          <DialogDescription>
            Заполните форму, и мы свяжемся с вами в ближайшее время для бесплатной консультации.
          </DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <h3 className="text-xl font-semibold">Заявка отправлена!</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
            <Button onClick={() => handleClose(false)}>Закрыть</Button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше полное имя"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.ru"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 900 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Компания (необязательно)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Название компании"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="package">Тариф *</Label>
            <Select
              value={formData.package}
              onValueChange={(value) => setFormData({ ...formData, package: value })}
            >
              <SelectTrigger id="package">
                <SelectValue placeholder="Выберите тариф" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Старт">Старт</SelectItem>
                <SelectItem value="Бизнес">Бизнес</SelectItem>
                <SelectItem value="Комплекс">Комплекс</SelectItem>
                <SelectItem value="Еще не определился">Ещё не определился</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Описание проекта *</Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Расскажите о проекте, пожеланиях и сроках..."
              rows={4}
            />
          </div>

          {status === "error" && (
            <p className="text-destructive text-sm">Ошибка отправки. Попробуйте позже.</p>
          )}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => handleClose(false)} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1" disabled={status === "loading"}>
              {status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}