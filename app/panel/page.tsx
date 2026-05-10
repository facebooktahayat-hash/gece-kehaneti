"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards
} from "lucide-react";

type OrderStatus = "Tamamlandı" | "Hazırlanıyor" | "Yeni" | "İncelemede";
type PanelTab = "orders" | "completed" | "profile";

type CustomerOrder = {
  id: string;
  title: string;
  detail: string;
  date: string;
  price: number;
  status: OrderStatus;
  readerNote?: string;
};

type PanelCustomer = {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  membership: string;
  joinDate: string;
  lastLogin: string;
  orders: CustomerOrder[];
};

const registeredCustomers: PanelCustomer[] = [
  {
    id: "demo",
    username: "demo",
    password: "demo123",
    fullName: "Demo Kullanıcı",
    email: "demo@gecekehaneti.com",
    phone: "+90 555 000 00 00",
    membership: "Demo",
    joinDate: "09.05.2026",
    lastLogin: "Bugün, 11:22",
    orders: [
      {
        id: "GK-2041",
        title: "Tarot Falı",
        detail: "Derin Yorum",
        date: "12.05.2026",
        price: 299,
        status: "Tamamlandı",
        readerNote: "Kart açılımınız tamamlandı. Aşk ve karar enerjisi için özel notlar panelinize işlendi."
      },
      {
        id: "GK-2042",
        title: "Kahve Falı",
        detail: "Kısa Yorum",
        date: "12.05.2026",
        price: 149,
        status: "Hazırlanıyor"
      },
      {
        id: "GK-2043",
        title: "Aşk Falı",
        detail: "Acil Kehanet",
        date: "13.05.2026",
        price: 699,
        status: "Yeni"
      },
      {
        id: "GK-2044",
        title: "Premium Ritüel",
        detail: "Premium Ritüel Yorum",
        date: "10.05.2026",
        price: 999,
        status: "Tamamlandı",
        readerNote: "Ritüel yorumunuz teslim edildi. Enerji bağı ve kapanış tavsiyeleri profil notlarınızda görünecek."
      }
    ]
  },
  {
    id: "aylin",
    username: "aylin",
    password: "gece123",
    fullName: "Aylin Kaya",
    email: "aylin@example.com",
    phone: "+90 532 111 22 33",
    membership: "Kayıtlı Kullanıcı",
    joinDate: "02.05.2026",
    lastLogin: "Dün, 20:18",
    orders: [
      {
        id: "GK-3017",
        title: "Astroloji Yorumu",
        detail: "Derin Yorum",
        date: "08.05.2026",
        price: 596,
        status: "Tamamlandı",
        readerNote: "Doğum haritası yorumunuz tamamlandı. Yakın dönem fırsatları için zamanlama notu eklendi."
      },
      {
        id: "GK-3021",
        title: "Rüya Yorumu",
        detail: "Kısa Yorum",
        date: "11.05.2026",
        price: 249,
        status: "İncelemede"
      }
    ]
  }
];

const tabLabels: Record<PanelTab, string> = {
  orders: "Siparişlerim",
  completed: "Tamamlananlar",
  profile: "Profil"
};

const statusStyle: Record<OrderStatus, string> = {
  Tamamlandı: "border-frost/35 bg-frost/10 text-frost shadow-[0_0_14px_rgba(0,215,255,.12)]",
  Hazırlanıyor: "border-gold/45 bg-gold/10 text-gold shadow-[0_0_14px_rgba(247,200,107,.10)]",
  Yeni: "border-ember/45 bg-ember/10 text-ember shadow-[0_0_14px_rgba(255,0,184,.12)]",
  İncelemede: "border-violet/45 bg-violet/10 text-[#cda6ff] shadow-[0_0_14px_rgba(124,28,255,.12)]"
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(price) + " TL";
}

export default function PanelPage() {
  const [activeTab, setActiveTab] = useState<PanelTab>("orders");
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo123");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCustomer = window.localStorage.getItem("gece-kehaneti-customer");
    if (savedCustomer && registeredCustomers.some((customer) => customer.id === savedCustomer)) {
      setCustomerId(savedCustomer);
    }
  }, []);

  const activeCustomer = useMemo(
    () => registeredCustomers.find((customer) => customer.id === customerId) ?? null,
    [customerId]
  );

  const totals = useMemo(() => {
    const orders = activeCustomer?.orders ?? [];
    const completed = orders.filter((order) => order.status === "Tamamlandı");
    return {
      orderCount: orders.length,
      completedCount: completed.length,
      totalSpent: orders.reduce((sum, order) => sum + order.price, 0),
      completed
    };
  }, [activeCustomer]);

  const visibleOrders = activeTab === "completed" ? totals.completed : activeCustomer?.orders ?? [];

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    const foundCustomer = registeredCustomers.find(
      (customer) =>
        (customer.username.toLowerCase() === normalizedUsername || customer.email.toLowerCase() === normalizedUsername) &&
        customer.password === password
    );

    if (!foundCustomer) {
      setError("Kullanıcı adı veya parola hatalı. Demo giriş için demo / demo123 kullanabilirsiniz.");
      return;
    }

    window.localStorage.setItem("gece-kehaneti-customer", foundCustomer.id);
    setCustomerId(foundCustomer.id);
    setActiveTab("orders");
    setError("");
  }

  function handleLogout() {
    window.localStorage.removeItem("gece-kehaneti-customer");
    setCustomerId(null);
    setActiveTab("orders");
  }

  if (!activeCustomer) {
    return (
      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 rounded-[1rem] border border-gold/42 bg-gold/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold shadow-[0_0_24px_rgba(247,200,107,.08)]">
            Kayıtlı kullanıcı paneli — giriş yapan müşteri kendi siparişlerini ve profil bilgilerini görür.
          </div>

          <div className="occult-panel p-6 md:p-10">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div>
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-ember/28 bg-ember/10 shadow-[0_0_28px_rgba(255,0,184,.18)]">
                  <LockKeyhole className="h-7 w-7 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.45)]" />
                </div>
                <p className="eyebrow-rune mb-4">Hoş geldin</p>
                <h1 className="font-display text-[2.2rem] font-black leading-none text-bone md:text-[4.2rem]">Panelim</h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-mourning md:text-base">
                  Kullanıcı adı ve parolasıyla giriş yapan gerçek müşteri; sipariş durumunu, tamamlanan yorumlarını ve profil bilgilerini bu ekranda görür.
                </p>
              </div>

              <form onSubmit={handleLogin} className="rounded-[1.35rem] border border-violet/24 bg-black/24 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-black text-bone">Giriş Yap</h2>
                    <p className="mt-1 text-xs text-mourning">Demo: demo / demo123</p>
                  </div>
                  <ShieldCheck className="h-7 w-7 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.35)]" />
                </div>

                <label className="mb-4 block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Kullanıcı adı veya e-posta</span>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="occult-input"
                    placeholder="demo"
                    autoComplete="username"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Parola</span>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="occult-input"
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                  />
                </label>

                {error && (
                  <p className="mt-4 rounded-xl border border-ember/28 bg-ember/10 px-4 py-3 text-sm text-[#ff8bdc]">{error}</p>
                )}

                <button className="occult-button mt-6 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white" type="submit">
                  <span className="relative z-10">Panele Gir</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center justify-between rounded-[1rem] border border-gold/42 bg-gold/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-gold shadow-[0_0_24px_rgba(247,200,107,.08)]">
          <span>
            {activeCustomer.membership === "Demo"
              ? "Demo panel - örnek veri gösteriliyor, gerçek müşteri bilgisi değildir."
              : "Müşteri paneli - bilgiler kayıtlı kullanıcı hesabına göre gösteriliyor."}
          </span>
          <button onClick={handleLogout} className="text-gold/90 transition hover:text-white" type="button">
            Çıkış
          </button>
        </div>

        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow-rune mb-4">Hoş geldin</p>
            <h1 className="font-display text-[2.35rem] font-black leading-none text-bone md:text-[4rem]">Panelim</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-mourning">
            <UserRound className="h-4 w-4 text-frost" />
            <span>Üyelik: <strong className="font-semibold text-bone">{activeCustomer.membership}</strong></span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {(Object.keys(tabLabels) as PanelTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                activeTab === tab
                  ? "border-ember/70 bg-ember/12 text-white shadow-[0_0_20px_rgba(255,0,184,.22)]"
                  : "border-violet/22 bg-black/18 text-mourning hover:border-ember/35 hover:text-bone"
              }`}
              type="button"
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <StatCard icon={<Sparkles className="h-5 w-5" />} label="Toplam Sipariş" value={String(totals.orderCount)} suffix="" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Tamamlanan" value={String(totals.completedCount)} suffix="" />
          <StatCard icon={<WalletCards className="h-5 w-5" />} label="Toplam Harcama" value={formatPrice(totals.totalSpent)} suffix="" />
        </div>

        {activeTab === "profile" ? (
          <ProfilePanel customer={activeCustomer} />
        ) : (
          <OrdersPanel orders={visibleOrders} title={activeTab === "completed" ? "Tamamlanan Siparişler" : "Siparişlerim"} />
        )}
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; suffix: string }) {
  return (
    <div className="occult-panel min-h-[112px] p-5">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-mourning">{label}</p>
          <p className="mt-3 text-2xl font-black text-ember drop-shadow-[0_0_12px_rgba(255,0,184,.28)] md:text-3xl">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full border border-violet/24 bg-violet/10 text-frost shadow-[0_0_20px_rgba(0,215,255,.08)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function OrdersPanel({ orders, title }: { orders: CustomerOrder[]; title: string }) {
  return (
    <div className="occult-panel p-4 md:p-6">
      <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-black uppercase tracking-[0.08em] text-bone md:text-xl">{title}</h2>
        <span className="text-xs text-mourning">{orders.length} kayıt</span>
      </div>

      <div className="relative z-10 overflow-hidden rounded-[1.1rem] border border-violet/16">
        <div className="hidden grid-cols-[1fr_1.5fr_.95fr_.8fr_.95fr] border-b border-violet/14 bg-black/26 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-mourning md:grid">
          <span>No</span>
          <span>Hizmet</span>
          <span>Tarih</span>
          <span>Tutar</span>
          <span className="text-right">Durum</span>
        </div>

        <div className="divide-y divide-violet/12">
          {orders.map((order) => (
            <div key={order.id} className="grid gap-4 px-4 py-4 text-sm text-bone md:grid-cols-[1fr_1.5fr_.95fr_.8fr_.95fr] md:items-center">
              <div className="font-mono text-xs text-cold">{order.id}</div>
              <div>
                <p className="font-semibold text-bone">{order.title} <span className="font-normal text-mourning">- {order.detail}</span></p>
                {order.readerNote && <p className="mt-2 max-w-xl text-xs leading-5 text-mourning">{order.readerNote}</p>}
              </div>
              <div className="text-xs text-mourning">{order.date}</div>
              <div className="font-semibold text-bone">{formatPrice(order.price)}</div>
              <div className="md:text-right">
                <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfilePanel({ customer }: { customer: PanelCustomer }) {
  const rows = [
    { icon: <UserRound className="h-4 w-4" />, label: "Ad Soyad", value: customer.fullName },
    { icon: <UserRound className="h-4 w-4" />, label: "Kullanıcı Adı", value: customer.username },
    { icon: <Mail className="h-4 w-4" />, label: "E-posta", value: customer.email },
    { icon: <Phone className="h-4 w-4" />, label: "Telefon", value: customer.phone },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "Üyelik", value: customer.membership },
    { icon: <CalendarDays className="h-4 w-4" />, label: "Kayıt Tarihi", value: customer.joinDate },
    { icon: <Clock3 className="h-4 w-4" />, label: "Son Giriş", value: customer.lastLogin },
    { icon: <Eye className="h-4 w-4" />, label: "Panel Yetkisi", value: "Kendi siparişlerini görüntüleyebilir" }
  ];

  return (
    <div className="occult-panel p-5 md:p-7">
      <div className="relative z-10 mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-black uppercase tracking-[0.08em] text-bone">Profil Bilgileri</h2>
          <p className="mt-2 text-sm text-mourning">Müşterinin giriş yaptıktan sonra göreceği kayıtlı bilgiler.</p>
        </div>
        <LogOut className="h-5 w-5 text-ember" />
      </div>

      <div className="relative z-10 grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-[1.05rem] border border-violet/16 bg-black/22 p-4">
            <div className="mb-2 flex items-center gap-2 text-frost/90">
              {row.icon}
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mourning">{row.label}</span>
            </div>
            <p className="text-sm font-semibold text-bone">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
