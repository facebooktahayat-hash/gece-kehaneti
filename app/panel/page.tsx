
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
  ShieldCheck,
  Sparkles,
  UserPlus,
  UserRound,
  CreditCard
} from "lucide-react";

type OrderStatus = "Tamamlandı" | "Hazırlanıyor" | "Yeni" | "İncelemede";
type PanelTab = "orders" | "completed" | "profile";
type AuthMode = "login" | "register";

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
  membership: string;
  joinDate: string;
  lastLogin: string;
  orders: CustomerOrder[];
};

type RegisterForm = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const storedCustomersKey = "gece-kehaneti-registered-customers";
const activeCustomerKey = "gece-kehaneti-customer-v2";
const legacyActiveCustomerKey = "gece-kehaneti-customer";

const registeredCustomers: PanelCustomer[] = [];

const tabLabels: Record<PanelTab, string> = {
  orders: "Yorum Taleplerim",
  completed: "Tamamlananlar",
  profile: "Profil"
};

const statusStyle: Record<OrderStatus, string> = {
  Tamamlandı: "border-frost/35 bg-frost/10 text-frost shadow-[0_0_14px_rgba(0,215,255,.12)]",
  Hazırlanıyor: "border-gold/45 bg-gold/10 text-gold shadow-[0_0_14px_rgba(247,200,107,.10)]",
  Yeni: "border-ember/45 bg-ember/10 text-ember shadow-[0_0_14px_rgba(255,0,184,.12)]",
  İncelemede: "border-violet/45 bg-violet/10 text-[#cda6ff] shadow-[0_0_14px_rgba(124,28,255,.12)]"
};

function formatCredits(price: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(price) + " Gece Kredisi";
}

function getTodayForPanel() {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date());
}

function getStoredCustomers(): PanelCustomer[] {
  if (typeof window === "undefined") return [];

  try {
    const rawCustomers = window.localStorage.getItem(storedCustomersKey);
    if (!rawCustomers) return [];
    const parsedCustomers = JSON.parse(rawCustomers) as PanelCustomer[];
    if (!Array.isArray(parsedCustomers)) return [];

    return parsedCustomers.filter(
      (customer) =>
        customer &&
        typeof customer.id === "string" &&
        typeof customer.username === "string" &&
        typeof customer.password === "string" &&
        typeof customer.email === "string"
    );
  } catch {
    return [];
  }
}

export default function PanelPage() {
  const [activeTab, setActiveTab] = useState<PanelTab>("orders");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [customers, setCustomers] = useState<PanelCustomer[]>(registeredCustomers);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
    const savedCustomers = getStoredCustomers();
    const mergedCustomers = [...registeredCustomers, ...savedCustomers];
    setCustomers(mergedCustomers);

    window.localStorage.removeItem(legacyActiveCustomerKey);

    const savedCustomer = window.localStorage.getItem(activeCustomerKey);
    if (savedCustomer && mergedCustomers.some((customer) => customer.id === savedCustomer)) {
      setCustomerId(savedCustomer);
    } else if (savedCustomer) {
      window.localStorage.removeItem(activeCustomerKey);
    }
  }, []);

  const activeCustomer = useMemo(
    () => customers.find((customer) => customer.id === customerId) ?? null,
    [customerId, customers]
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

  function resetMessages() {
    setError("");
    setSuccess("");
  }

  function switchAuthMode(mode: AuthMode) {
    setAuthMode(mode);
    resetMessages();
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    const foundCustomer = customers.find(
      (customer) =>
        (customer.username.toLowerCase() === normalizedUsername || customer.email.toLowerCase() === normalizedUsername) &&
        customer.password === password
    );

    if (!foundCustomer) {
      setError("Kullanıcı adı veya parola hatalı.");
      setSuccess("");
      return;
    }

    window.localStorage.setItem(activeCustomerKey, foundCustomer.id);
    setCustomerId(foundCustomer.id);
    setActiveTab("orders");
    resetMessages();
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fullName = registerForm.fullName.trim();
    const normalizedUsername = registerForm.username.trim().toLowerCase();
    const email = registerForm.email.trim().toLowerCase();
    const passwordValue = registerForm.password;

    if (!fullName || !normalizedUsername || !email || !passwordValue || !registerForm.passwordConfirm) {
      setError("Kayıt için ad soyad, kullanıcı adı, e-posta ve parola alanlarını doldurun.");
      setSuccess("");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Geçerli bir e-posta adresi yazın.");
      setSuccess("");
      return;
    }

    if (passwordValue.length < 6) {
      setError("Parola en az 6 karakter olmalı.");
      setSuccess("");
      return;
    }

    if (passwordValue !== registerForm.passwordConfirm) {
      setError("Parola tekrarı eşleşmiyor.");
      setSuccess("");
      return;
    }

    const alreadyExists = customers.some(
      (customer) =>
        customer.username.toLowerCase() === normalizedUsername || customer.email.toLowerCase() === email
    );

    if (alreadyExists) {
      setError("Bu kullanıcı adı veya e-posta zaten kayıtlı. Giriş yapmayı deneyin.");
      setSuccess("");
      return;
    }

    const newCustomer: PanelCustomer = {
      id: `musteri-${Date.now()}`,
      username: normalizedUsername,
      password: passwordValue,
      fullName,
      email,
      membership: "Kayıtlı Kullanıcı",
      joinDate: getTodayForPanel(),
      lastLogin: "Şimdi",
      orders: []
    };

    const storedCustomers = [...getStoredCustomers(), newCustomer];
    window.localStorage.setItem(storedCustomersKey, JSON.stringify(storedCustomers));
    window.localStorage.setItem(activeCustomerKey, newCustomer.id);

    setCustomers([...registeredCustomers, ...storedCustomers]);
    setCustomerId(newCustomer.id);
    setActiveTab("profile");
    setRegisterForm({
      fullName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    });
    setError("");
    setSuccess("Hesap oluşturuldu. Artık bu kullanıcı adı ve parolayla panele giriş yapılabilir.");
  }

  function handleLogout() {
    window.localStorage.removeItem(activeCustomerKey);
    window.localStorage.removeItem(legacyActiveCustomerKey);
    setCustomerId(null);
    setActiveTab("orders");
    setAuthMode("login");
    resetMessages();
  }

  if (!activeCustomer) {
    return (
      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="occult-panel p-6 md:p-10">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div>
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-ember/28 bg-ember/10 shadow-[0_0_28px_rgba(255,0,184,.18)]">
                  {authMode === "login" ? (
                    <LockKeyhole className="h-7 w-7 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.45)]" />
                  ) : (
                    <UserPlus className="h-7 w-7 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.45)]" />
                  )}
                </div>
                <p className="eyebrow-rune mb-4">Hoş geldin</p>
                <h1 className="font-display text-[2.2rem] font-black leading-none text-bone md:text-[4.2rem]">Panelim</h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-mourning md:text-base">
                  Hesabını oluştur, kullanıcı adı ve parolanla giriş yap, yorum talebi durumunu ve profil bilgilerini bu ekrandan takip et.
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-violet/24 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] md:p-6">
                <div className="mb-5 flex rounded-full border border-violet/18 bg-black/25 p-1">
                  <button
                    onClick={() => switchAuthMode("login")}
                    className={`flex-1 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                      authMode === "login"
                        ? "bg-ember/14 text-white shadow-[0_0_18px_rgba(255,0,184,.16)]"
                        : "text-mourning hover:text-bone"
                    }`}
                    type="button"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => switchAuthMode("register")}
                    className={`flex-1 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                      authMode === "register"
                        ? "bg-ember/14 text-white shadow-[0_0_18px_rgba(255,0,184,.16)]"
                        : "text-mourning hover:text-bone"
                    }`}
                    type="button"
                  >
                    Kayıt Ol
                  </button>
                </div>

                {authMode === "login" ? (
                  <form onSubmit={handleLogin} autoComplete="off">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-black text-bone">Giriş Yap</h2>
                        <p className="mt-1 text-xs text-mourning">Hesabına kullanıcı adı veya e-posta ile gir.</p>
                      </div>
                      <ShieldCheck className="h-7 w-7 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.35)]" />
                    </div>

                    <label className="mb-4 block">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Kullanıcı adı veya e-posta</span>
                      <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="occult-input"
                        placeholder="Kullanıcı adınızı yazın"
                        name="gece-kehaneti-panel-kimlik"
                        autoComplete="off"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Parola</span>
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="occult-input"
                        placeholder="Parolanızı yazın"
                        type="password"
                        name="gece-kehaneti-panel-gizli-anahtar"
                        autoComplete="off"
                      />
                    </label>

                    {error && (
                      <p className="mt-4 rounded-xl border border-ember/28 bg-ember/10 px-4 py-3 text-sm text-[#ff8bdc]">{error}</p>
                    )}
                    {success && (
                      <p className="mt-4 rounded-xl border border-frost/28 bg-frost/10 px-4 py-3 text-sm text-frost">{success}</p>
                    )}

                    <button className="occult-button mt-6 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white" type="submit">
                      <span className="relative z-10">Panele Gir</span>
                    </button>

                    <button
                      onClick={() => switchAuthMode("register")}
                      className="mt-4 w-full rounded-full border border-ember/45 bg-ember/10 px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(255,0,184,.12)] transition hover:border-ember/80 hover:bg-ember/16"
                      type="button"
                    >
                      Kayıt Ol
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} autoComplete="off">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-black text-bone">Kayıt Ol</h2>
                        <p className="mt-1 text-xs text-mourning">Yeni müşteri hesabı oluştur</p>
                      </div>
                      <UserPlus className="h-7 w-7 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.35)]" />
                    </div>

                    <label className="mb-4 block">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Ad Soyad</span>
                      <input
                        value={registerForm.fullName}
                        onChange={(event) => setRegisterForm({ ...registerForm, fullName: event.target.value })}
                        className="occult-input"
                        placeholder="Adınız Soyadınız"
                        autoComplete="name"
                      />
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Kullanıcı Adı</span>
                        <input
                          value={registerForm.username}
                          onChange={(event) => setRegisterForm({ ...registerForm, username: event.target.value })}
                          className="occult-input"
                          placeholder="ornek_kullanici"
                          autoComplete="off"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">E-posta</span>
                        <input
                          value={registerForm.email}
                          onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                          className="occult-input"
                          placeholder="mail@ornek.com"
                          type="email"
                          autoComplete="email"
                        />
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Parola</span>
                        <input
                          value={registerForm.password}
                          onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                          className="occult-input"
                          placeholder="Parolanızı yazın"
                          type="password"
                          name="gece-kehaneti-yeni-gizli-anahtar"
                          autoComplete="off"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Parola Tekrarı</span>
                        <input
                          value={registerForm.passwordConfirm}
                          onChange={(event) => setRegisterForm({ ...registerForm, passwordConfirm: event.target.value })}
                          className="occult-input"
                          placeholder="Parolayı tekrar yazın"
                          type="password"
                          name="gece-kehaneti-yeni-gizli-anahtar-tekrar"
                          autoComplete="off"
                        />
                      </label>
                    </div>

                    {error && (
                      <p className="mt-4 rounded-xl border border-ember/28 bg-ember/10 px-4 py-3 text-sm text-[#ff8bdc]">{error}</p>
                    )}
                    {success && (
                      <p className="mt-4 rounded-xl border border-frost/28 bg-frost/10 px-4 py-3 text-sm text-frost">{success}</p>
                    )}

                    <button className="occult-button mt-6 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white" type="submit">
                      <span className="relative z-10">Hesap Oluştur</span>
                    </button>

                    <button
                      onClick={() => switchAuthMode("login")}
                      className="mt-4 w-full text-center text-xs font-semibold uppercase tracking-[0.16em] text-mourning transition hover:text-bone"
                      type="button"
                    >
                      Zaten hesabın var mı? Giriş yap
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow-rune mb-4">Hoş geldin</p>
            <h1 className="font-display text-[2.35rem] font-black leading-none text-bone md:text-[4rem]">Panelim</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-mourning">
            <div className="flex items-center gap-3">
              <UserRound className="h-4 w-4 text-frost" />
              <span>Üyelik: <strong className="font-semibold text-bone">{activeCustomer.membership}</strong></span>
            </div>
            <button onClick={handleLogout} className="rounded-full border border-violet/22 bg-black/18 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-mourning transition hover:border-ember/50 hover:text-bone" type="button">
              Çıkış
            </button>
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
          <StatCard icon={<Sparkles className="h-5 w-5" />} label="Toplam Talep" value={String(totals.orderCount)} suffix="" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Tamamlanan" value={String(totals.completedCount)} suffix="" />
          <StatCard icon={<CreditCard className="h-5 w-5" />} label="Kullanılan Kredi" value={formatCredits(totals.totalSpent)} suffix="" />
        </div>

        {activeTab === "profile" ? (
          <ProfilePanel customer={activeCustomer} />
        ) : (
          <OrdersPanel orders={visibleOrders} title={activeTab === "completed" ? "Tamamlanan Yorumlar" : "Yorum Taleplerim"} />
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

      {orders.length === 0 ? (
        <div className="relative z-10 rounded-[1.1rem] border border-violet/16 bg-black/22 px-5 py-8 text-center">
          <p className="font-display text-2xl font-black text-bone">Henüz yorum talebi yok</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-mourning">
            Müşteri yeni kayıt olduysa yorum talebi geçmişi boş görünür. Gece Kredisi ve yorum talebi sistemi bağlandığında kayıtlar bu alana otomatik düşer.
          </p>
        </div>
      ) : (
        <div className="relative z-10 overflow-hidden rounded-[1.1rem] border border-violet/16">
          <div className="hidden grid-cols-[1fr_1.5fr_.95fr_.8fr_.95fr] border-b border-violet/14 bg-black/30 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-mourning md:grid">
            <span>No</span>
            <span>Hizmet</span>
            <span>Tarih</span>
            <span>Kredi</span>
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
                <div className="font-semibold text-bone">{formatCredits(order.price)}</div>
                <div className="md:text-right">
                  <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfilePanel({ customer }: { customer: PanelCustomer }) {
  const rows = [
    { icon: <UserRound className="h-4 w-4" />, label: "Ad Soyad", value: customer.fullName },
    { icon: <UserRound className="h-4 w-4" />, label: "Kullanıcı Adı", value: customer.username },
    { icon: <Mail className="h-4 w-4" />, label: "E-posta", value: customer.email },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "Üyelik", value: customer.membership },
    { icon: <CalendarDays className="h-4 w-4" />, label: "Kayıt Tarihi", value: customer.joinDate },
    { icon: <Clock3 className="h-4 w-4" />, label: "Son Giriş", value: customer.lastLogin },
    { icon: <Eye className="h-4 w-4" />, label: "Panel Yetkisi", value: "Kendi yorum taleplerini görüntüleyebilir" }
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
