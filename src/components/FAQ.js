import { useTranslation } from "../i18n/Language";
import React from "react";
export default function FAQ() {
  const { t } = useTranslation();
  const items = [
    ["Hangi yazılım hizmetlerini sunuyorsunuz?", "Özel yazılım, web ve mobil uygulama, kurumsal yönetim sistemleri, entegrasyon ve teknoloji danışmanlığı sunuyoruz. Çözümü işletmenizin süreçlerine göre planlıyoruz."],
    ["Uşak dışındaki işletmelerle çalışıyor musunuz?", "Evet. Uşak merkezli ekibimizle uzaktan toplantı, düzenli iletişim ve ortak proje takibi üzerinden farklı şehirlerdeki işletmelerle de çalışıyoruz."],
    ["Proje süresi ve bütçesi nasıl belirleniyor?", "İhtiyaçlarınızı, kapsamı ve entegrasyonları birlikte değerlendiriyoruz. Teslim aşamalarını ve bütçeyi bu değerlendirmeden sonra netleştiriyoruz."],
    ["Mevcut sistemlerimizle entegrasyon yapılabilir mi?", "Kullandığınız sistemlerin teknik olanaklarını ve API erişimlerini inceleyerek veri akışlarını ve entegrasyon kapsamını belirliyoruz."],
    ["Yayına çıktıktan sonra destek sağlıyor musunuz?", "Bakım, destek ve iyileştirme hizmetleri sunuyoruz. Destek kapsamını, güncelleme planını ve çalışma koşullarını proje başlangıcında birlikte kararlaştırıyoruz."],
  ];
  return <section className="container site-faq" aria-labelledby="faq-title"><div className="eyebrow">{t("SIK SORULAN SORULAR")}</div><h2 id="faq-title">{t("Başlamadan önce.")}</h2>{items.map(([q,a]) => <details key={q}><summary>{t(q)}</summary><p>{t(a)}</p></details>)}</section>;
}
