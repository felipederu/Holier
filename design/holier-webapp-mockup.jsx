import { useState, useEffect, useRef } from 'react'
import { Sunrise, BookOpen, PenLine, User, Anchor, X } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Contenido de ejemplo                                               */
/*  Los textos bíblicos son marcadores: en la app real vendrán del     */
/*  JSON / corpus con una traducción de dominio público.               */
/* ------------------------------------------------------------------ */

const STATES = [
  {
    id: 'peace',
    label: 'Caminando en paz',
    verse: 'Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.',
    ref: 'Salmo 136:1',
    message: 'Da gracias. Lo que hoy tienes también es obra suya.',
  },
  {
    id: 'struggle',
    label: 'En la lucha',
    verse:
      'Fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir, sino que dará también juntamente con la tentación la salida, para que podáis soportar.',
    ref: '1 Corintios 10:13',
    message: 'Estar en la lucha no es haber fracasado. Pide la salida que él prometió.',
  },
  {
    id: 'relapse',
    label: 'Caí hoy',
    verse:
      'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.',
    ref: '1 Juan 1:9',
    message: 'Esto no cambia lo que Cristo ya hizo por ti. Vuelve a él hoy, tal como estás.',
  },
]

const EMOTIONS = ['Paz', 'Gratitud', 'Alegría', 'Ansiedad', 'Tristeza', 'Tentación']

const SAMPLE_ENTRIES = [
  {
    id: 's1',
    offset: 1,
    state: 'struggle',
    emotion: 'Ansiedad',
    note: 'Semana pesada en el trabajo. Me dieron ganas de evadirme, pero oré antes de abrir el celular y eso me ayudó a parar ahí.',
  },
  {
    id: 's2',
    offset: 3,
    state: 'peace',
    emotion: 'Gratitud',
    note: 'Leí el Salmo 23 mientras caminaba. No sentí nada extraordinario, pero había una calma que no venía de mí.',
  },
  {
    id: 's3',
    offset: 4,
    state: 'relapse',
    emotion: 'Tristeza',
    note: 'Caí de noche, cansado, otra vez. Me cuesta no hundirme en la vergüenza. Volví a leer 1 Juan 1:9 y dejé el celular lejos.',
  },
  {
    id: 's4',
    offset: 6,
    state: 'peace',
    emotion: 'Alegría',
    note: 'Cantamos en la iglesia y por primera vez en semanas canté de verdad.',
  },
  {
    id: 's5',
    offset: 9,
    state: 'struggle',
    emotion: 'Tentación',
    note: 'Tarde difícil. Salí a caminar y le escribí a un amigo. No fue perfecto, pero no me quedé solo.',
  },
]

const SAMPLE_STONES = [
  { id: 'p1', offset: 5, text: 'Un amigo me escribió justo el día que más lo necesitaba.' },
  { id: 'p2', offset: 12, text: 'Entendí por primera vez por qué Romanos 8 es una buena noticia.' },
]

const STEPS = [
  { t: 'Leer', d: 'El pasaje completo, con las palabras clave en hebreo o griego señaladas.' },
  { t: 'Observar', d: 'Preguntas para mirar el texto antes de interpretarlo.' },
  { t: 'Aplicar', d: 'Qué te dice Dios en lo que estás viviendo hoy.' },
  { t: 'Orar', d: 'Puntos concretos para responderle.' },
]

const TABS = [
  { id: 'hoy', label: 'Hoy', Icon: Sunrise },
  { id: 'estudio', label: 'Estudio', Icon: BookOpen },
  { id: 'diario', label: 'Diario', Icon: PenLine },
  { id: 'perfil', label: 'Perfil', Icon: User },
]

const WIDTHS = { desktop: '1240px', tablet: '768px', mobile: '390px' }

/* ------------------------------------------------------------------ */
/*  Utilidades                                                         */
/* ------------------------------------------------------------------ */

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const dayLabel = (offset) => {
  if (offset === 0) return 'Hoy'
  if (offset === 1) return 'Ayer'
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return cap(
    d
      .toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })
      .replace(/\./g, ''),
  )
}

/* ------------------------------------------------------------------ */
/*  Piezas pequeñas                                                    */
/* ------------------------------------------------------------------ */

function StateMark({ id }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
      {id === 'peace' && <circle cx="7" cy="7" r="6" fill="var(--sage)" />}
      {id === 'struggle' && (
        <>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
          <path d="M7 1.5 A5.5 5.5 0 0 0 7 12.5 Z" fill="var(--primary)" />
        </>
      )}
      {id === 'relapse' && (
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" />
      )}
    </svg>
  )
}

function StoneMark() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" style={{ marginTop: 4 }}>
      <path
        d="M2 10.5 C1 6.5 4 2 9 2 C14 2 17 5.5 16 9.5 C15.5 11.5 13.5 12.5 9 12.5 C4.5 12.5 2.4 12 2 10.5Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function Entries({ items, clamp }) {
  return (
    <ul className="hl-entries">
      {items.map((e) => {
        const s = STATES.find((x) => x.id === e.state)
        return (
          <li key={e.id} className="hl-entry">
            <div className="hl-entry-date">{dayLabel(e.offset)}</div>
            <div>
              <p className="hl-entry-state">
                <StateMark id={e.state} />
                <span>
                  {s.label}
                  {e.emotion ? `, con ${e.emotion.toLowerCase()}` : ''}
                </span>
              </p>
              {e.note && (
                <p className={`hl-entry-note${clamp ? ' hl-entry-note--clamp' : ''}`}>{e.note}</p>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="hl-switch"
      onClick={() => onChange(!checked)}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

const EMPTY_DRAFT = { state: null, emotion: null, note: '' }

export default function HolierWebapp() {
  // Controles del mockup
  const [size, setSize] = useState('desktop') // desktop | tablet | mobile
  const [view, setView] = useState('new') // new | history
  const [theme, setTheme] = useState('light')

  // Estado de la app
  const [tab, setTab] = useState('hoy')
  const [entries, setEntries] = useState([])
  const [stones, setStones] = useState([])
  const [stoneText, setStoneText] = useState('')
  const [showNumbers, setShowNumbers] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [phase, setPhase] = useState('idle') // idle | choose | form | done
  const [draft, setDraft] = useState(EMPTY_DRAFT)

  const contentRef = useRef(null)
  const closeRef = useRef(null)

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'
  const dateStr = cap(
    now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }),
  )

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0 })
  }, [tab])

  useEffect(() => {
    if (!sheet) return
    if (closeRef.current) closeRef.current.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setSheet(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  const sorted = [...entries].sort((a, b) => a.offset - b.offset)
  const todayEntry = sorted.find((e) => e.offset === 0)
  const showOptions = phase === 'choose' || phase === 'form' || (phase === 'idle' && !todayEntry)
  const count = (id) => entries.filter((e) => e.state === id).length

  const changeView = (v) => {
    setView(v)
    setEntries(v === 'history' ? SAMPLE_ENTRIES : [])
    setStones(v === 'history' ? SAMPLE_STONES : [])
    setPhase('idle')
    setDraft(EMPTY_DRAFT)
    setTab('hoy')
  }

  const pickState = (id) => {
    setDraft((d) => ({ ...d, state: id }))
    setPhase('form')
  }

  const toggleEmotion = (em) => setDraft((d) => ({ ...d, emotion: d.emotion === em ? null : em }))

  const saveEntry = () => {
    if (!draft.state) return
    setEntries((es) => [{ id: `n${Date.now()}`, offset: 0, ...draft }, ...es])
    setPhase('done')
  }

  const finish = () => {
    setDraft(EMPTY_DRAFT)
    setPhase('idle')
  }

  const addStone = () => {
    const t = stoneText.trim()
    if (!t) return
    setStones((s) => [{ id: `p${Date.now()}`, offset: 0, text: t }, ...s])
    setStoneText('')
  }

  const goCheckin = () => {
    setSheet(false)
    setTab('hoy')
    setTimeout(() => {
      const el = document.getElementById('hl-checkin')
      if (el) el.scrollIntoView({ block: 'start' })
    }, 60)
  }

  const doneState = STATES.find((s) => s.id === draft.state)
  const title = tab === 'hoy' ? greeting : TABS.find((t) => t.id === tab).label

  /* ---------------------------- Pantallas ---------------------------- */

  const recent = (
    <>
      {sorted.length === 0 ? (
        <>
          <h2 className="hl-h2">Tu historia con Dios empieza aquí</h2>
          <p className="hl-empty">
            Cuando hagas tu primer registro, tus reflexiones aparecerán en este lugar.
          </p>
        </>
      ) : (
        <>
          <h2 className="hl-h2">Reflexiones recientes</h2>
          <Entries items={sorted.slice(0, 3)} clamp />
          {showNumbers && (
            <p className="hl-numbers">
              En tus últimos {entries.length} registros: {count('peace')} en paz,{' '}
              {count('struggle')} en la lucha, {count('relapse')}{' '}
              {count('relapse') === 1 ? 'caída' : 'caídas'}.
            </p>
          )}
          <button type="button" className="hl-link" onClick={() => setTab('diario')}>
            Ver todo el diario
          </button>
        </>
      )}
    </>
  )

  const hoy = (
    <div className="hl-two">
      <div className="hl-two-main">
        <section>
          <p className="hl-verse hl-verse--xl">Abre mis ojos, y miraré las maravillas de tu ley.</p>
          <p className="hl-ref">Salmo 119:18</p>
          <button
            type="button"
            className="hl-btn hl-btn--primary hl-cta"
            onClick={() => setTab('estudio')}
          >
            Empezar devocional
          </button>
          <p className="hl-hint">Unos diez minutos para leer, observar y orar.</p>
        </section>

        <section className="hl-section" id="hl-checkin" aria-labelledby="hl-checkin-title">
          <h2 className="hl-h2" id="hl-checkin-title">
            ¿Cómo estás hoy?
          </h2>

          {phase === 'done' && doneState ? (
            <div role="status">
              <p className="hl-verse hl-verse--md">{doneState.verse}</p>
              <p className="hl-ref">{doneState.ref}</p>
              <p className="hl-grace-msg">{doneState.message}</p>
              <button type="button" className="hl-btn hl-btn--primary" onClick={finish}>
                Listo
              </button>
            </div>
          ) : (
            <>
              {phase === 'idle' && todayEntry && (
                <p className="hl-logged">
                  <span>
                    Hoy registraste: {STATES.find((s) => s.id === todayEntry.state).label}.
                  </span>
                  <button type="button" className="hl-link" onClick={() => setPhase('choose')}>
                    Agregar otro registro
                  </button>
                </p>
              )}

              {showOptions && (
                <div className="hl-options">
                  {STATES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="hl-option"
                      aria-pressed={draft.state === s.id}
                      onClick={() => pickState(s.id)}
                    >
                      <StateMark id={s.id} />
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {phase === 'form' && (
                <div className="hl-form">
                  <div>
                    <p className="hl-field-label">¿Qué emoción predomina?</p>
                    <div className="hl-chips">
                      {EMOTIONS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          className="hl-chip"
                          aria-pressed={draft.emotion === em}
                          onClick={() => toggleEmotion(em)}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      className="hl-field-label"
                      htmlFor="hl-note"
                      style={{ display: 'block' }}
                    >
                      Una nota para recordar (opcional)
                    </label>
                    <textarea
                      id="hl-note"
                      className="hl-textarea"
                      maxLength={500}
                      value={draft.note}
                      onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
                      placeholder="Lo que quieras decirle a Dios o recordar de hoy"
                    />
                    <p className="hl-count">{draft.note.length}/500</p>
                  </div>
                  <div className="hl-actions">
                    <button type="button" className="hl-btn hl-btn--primary" onClick={saveEntry}>
                      Guardar registro
                    </button>
                    <button type="button" className="hl-link" onClick={finish}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <aside className="hl-two-side" aria-label="Reflexiones recientes">
        {recent}
      </aside>
    </div>
  )

  const estudio = (
    <div className="hl-col">
      <p className="hl-verse hl-verse--lg">El devocional guiado llega pronto.</p>
      <p className="hl-body">Así será cada sesión:</p>
      <ol className="hl-steps">
        {STEPS.map((s) => (
          <li key={s.t} className="hl-step">
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
      <button type="button" className="hl-btn hl-btn--secondary" onClick={() => setTab('hoy')}>
        Volver a Hoy
      </button>
    </div>
  )

  const diario = (
    <div className="hl-two">
      <div className="hl-two-main">
        <h2 className="hl-h2">Registros</h2>
        {sorted.length === 0 ? (
          <p className="hl-empty">
            Tus registros aparecerán aquí, del más reciente al más antiguo.
          </p>
        ) : (
          <Entries items={sorted} />
        )}
      </div>

      <section className="hl-two-side" aria-labelledby="hl-stones-title">
        <h2 className="hl-h2" id="hl-stones-title">
          Piedras de Ebenezer
        </h2>
        <p className="hl-verse hl-verse--md">Hasta aquí nos ayudó Jehová.</p>
        <p className="hl-ref">1 Samuel 7:12</p>
        <p className="hl-body">
          Anota lo que has visto a Dios hacer, para recordarlo cuando dudes.
        </p>
        {stones.length > 0 && (
          <ul className="hl-stones">
            {stones.map((s) => (
              <li key={s.id} className="hl-stone">
                <StoneMark />
                <div>
                  <p>{s.text}</p>
                  <small>{dayLabel(s.offset)}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="hl-add">
          <input
            className="hl-input"
            aria-label="Nueva piedra"
            placeholder="Qué hizo Dios hoy"
            value={stoneText}
            onChange={(e) => setStoneText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addStone()
            }}
          />
          <button type="button" className="hl-btn hl-btn--primary" onClick={addStone}>
            Agregar
          </button>
        </div>
      </section>
    </div>
  )

  const perfil = (
    <div className="hl-col">
      <p className="hl-body" style={{ marginTop: 0 }}>
        Sesión iniciada como <strong>tu@correo.com</strong>
      </p>

      <div className="hl-rows">
        <div className="hl-row">
          <div>
            <p className="hl-row-title">Modo oscuro</p>
            <p className="hl-row-desc">Más cómodo para leer y orar de noche.</p>
          </div>
          <Switch
            label="Modo oscuro"
            checked={theme === 'dark'}
            onChange={(v) => setTheme(v ? 'dark' : 'light')}
          />
        </div>
        <div className="hl-row">
          <div>
            <p className="hl-row-title">Mostrar números</p>
            <p className="hl-row-desc">
              La vida con Dios no se mide en rachas. Si prefieres ver conteos, puedes activarlos
              aquí.
            </p>
          </div>
          <Switch label="Mostrar números" checked={showNumbers} onChange={setShowNumbers} />
        </div>
      </div>

      <button type="button" className="hl-btn hl-btn--secondary" style={{ marginTop: 24 }}>
        Cerrar sesión
      </button>
    </div>
  )

  const screens = { hoy, estudio, diario, perfil }

  /* ------------------------------ Render ------------------------------ */

  return (
    <div className="holier hl-root" data-theme={theme}>
      <style>{CSS}</style>

      {/* Controles del mockup (no forman parte de la app) */}
      <div className="hl-bar" role="group" aria-label="Controles del mockup">
        <div className="hl-ctl">
          <p className="hl-ctl-label">Ancho de ventana</p>
          <div className="hl-seg">
            {[
              ['desktop', 'Escritorio'],
              ['tablet', 'Tablet'],
              ['mobile', 'Móvil'],
            ].map(([id, label]) => (
              <button key={id} type="button" aria-pressed={size === id} onClick={() => setSize(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="hl-ctl">
          <p className="hl-ctl-label">Vista</p>
          <div className="hl-seg">
            <button type="button" aria-pressed={view === 'new'} onClick={() => changeView('new')}>
              Usuario nuevo
            </button>
            <button
              type="button"
              aria-pressed={view === 'history'}
              onClick={() => changeView('history')}
            >
              Con historial
            </button>
          </div>
        </div>
        <div className="hl-ctl">
          <p className="hl-ctl-label">Tema</p>
          <div className="hl-seg">
            <button
              type="button"
              aria-pressed={theme === 'light'}
              onClick={() => setTheme('light')}
            >
              Claro
            </button>
            <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
              Oscuro
            </button>
          </div>
        </div>
        <p className="hl-bar-note">
          Es la misma webapp en los tres casos: se reacomoda según el ancho de la ventana del
          navegador.
        </p>
      </div>

      {/* Ventana de navegador con la webapp dentro */}
      <div className="hl-win" data-size={size} style={{ '--w': WIDTHS[size] }}>
        <div className="hl-chrome" aria-hidden="true">
          <span className="hl-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="hl-url">holier.app/{tab}</span>
        </div>

        <div className="hl-viewport">
          <div className="hl-app">
            {/* Barra lateral: solo en pantallas anchas */}
            <aside className="hl-side">
              <p className="hl-brand">Holier</p>
              <nav className="hl-sidenav" aria-label="Principal">
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className="hl-sidelink"
                    aria-current={tab === id ? 'page' : undefined}
                    onClick={() => setTab(id)}
                  >
                    <Icon size={20} strokeWidth={tab === id ? 2.2 : 1.7} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </nav>
              <p className="hl-account">tu@correo.com</p>
            </aside>

            <div className="hl-body-col">
              <header className="hl-topbar">
                <div>
                  <h1 className="hl-title">{title}</h1>
                  {tab === 'hoy' && <p className="hl-date">{dateStr}</p>}
                </div>
                <button type="button" className="hl-sos" onClick={() => setSheet(true)}>
                  <Anchor size={16} aria-hidden="true" />
                  Estoy luchando ahora
                </button>
              </header>

              <main className="hl-content" ref={contentRef}>
                {screens[tab]}
              </main>

              {/* Barra inferior: solo en pantallas angostas */}
              <nav className="hl-nav" aria-label="Principal">
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className="hl-tab"
                    aria-current={tab === id ? 'page' : undefined}
                    onClick={() => setTab(id)}
                  >
                    <Icon size={22} strokeWidth={tab === id ? 2.2 : 1.7} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {sheet && (
            <div className="hl-overlay" onClick={() => setSheet(false)}>
              <div
                className="hl-sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Estoy luchando ahora"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="hl-iconbtn hl-sheet-close"
                  ref={closeRef}
                  onClick={() => setSheet(false)}
                  aria-label="Cerrar"
                >
                  <X size={22} aria-hidden="true" />
                </button>

                <p className="hl-verse hl-verse--lg">
                  Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.
                </p>
                <p className="hl-ref">Salmo 46:1</p>

                <p className="hl-body">
                  Levántate, cambia de lugar y respira hondo. Esto va a pasar, y no estás solo.
                </p>
                <blockquote className="hl-prayer">
                  Señor, estoy débil y te necesito ahora. Tú eres más fuerte que esto que me llama.
                  Dame la salida que prometiste y recuérdame quién soy en Cristo. Amén.
                </blockquote>
                <p className="hl-body">Cuando puedas, escríbele a alguien de confianza.</p>

                <div className="hl-actions" style={{ marginTop: 28 }}>
                  <button type="button" className="hl-btn hl-btn--primary" onClick={goCheckin}>
                    Registrar cómo estoy
                  </button>
                  <button
                    type="button"
                    className="hl-btn hl-btn--secondary"
                    onClick={() => setSheet(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Estilos                                                            */
/*  Los puntos de quiebre usan @container: responden al ancho de la    */
/*  "ventana" del mockup. En el proyecto real usarás @media (o         */
/*  breakpoints de Tailwind) y responden al ancho del navegador.       */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap');

.holier{
  --sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  --serif:'Source Serif 4','Iowan Old Style','Palatino Linotype',Georgia,serif;
  --stage:#EDE7DB; --panel-line:#C9C0B0;
  --bg:#FAF7F2; --surface:#F2EDE3; --ink:#1F2933; --ink-soft:#5A6570;
  --line:#E0D8CA; --edge:#928D83;
  --primary:#2F4A5A; --on-primary:#FAF7F2; --sage:#5B7B6A; --gold:#B08D57;
}
.holier[data-theme="dark"]{
  --stage:#0C1013; --panel-line:#36414A;
  --bg:#14191E; --surface:#1B2229; --ink:#EDE8DF; --ink-soft:#A3ADB5;
  --line:#2A333B; --edge:#5C6770;
  --primary:#9DBBCC; --on-primary:#14191E; --sage:#8DB09C; --gold:#C9A46B;
}
.holier *{box-sizing:border-box}
.holier button,.holier input,.holier textarea{font-family:inherit}
.holier :focus-visible{outline:2px solid var(--primary);outline-offset:2px}

/* Escenario y controles del mockup */
.hl-root{min-height:100vh;padding:20px 24px 32px;background:var(--stage);color:var(--ink);font-family:var(--sans);transition:background .2s}
.hl-bar{display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;width:min(100%,1240px);margin:0 auto 16px}
.hl-ctl{display:flex;align-items:center;gap:10px}
.hl-ctl-label{margin:0;font-size:13px;font-weight:600;color:var(--ink-soft)}
.hl-bar-note{flex-basis:100%;margin:0;font-size:13px;color:var(--ink-soft)}
.hl-seg{display:flex;gap:3px;padding:3px;border:1px solid var(--panel-line);border-radius:10px}
.hl-seg button{padding:7px 12px;border:0;border-radius:7px;background:transparent;color:var(--ink);font-size:13px;font-weight:500;cursor:pointer}
.hl-seg button[aria-pressed="true"]{background:var(--primary);color:var(--on-primary)}

/* Ventana de navegador */
.hl-win{display:flex;flex-direction:column;width:min(100%,var(--w));height:clamp(560px,calc(100vh - 170px),900px);
  margin:0 auto;border:1px solid var(--panel-line);border-radius:14px;overflow:hidden;background:var(--bg);transition:width .25s}
.hl-chrome{flex:none;display:flex;align-items:center;gap:12px;padding:9px 14px;border-bottom:1px solid var(--line);background:var(--surface)}
.hl-dots{display:flex;gap:6px;width:54px}
.hl-dots i{width:10px;height:10px;border-radius:50%;background:var(--edge);opacity:.45}
.hl-url{flex:1;min-width:0;max-width:380px;margin:0 auto;padding:5px 12px;border-radius:999px;background:var(--bg);
  color:var(--ink-soft);font-size:12px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hl-win[data-size="mobile"] .hl-dots{display:none}

/* Viewport = contenedor de consultas */
.hl-viewport{position:relative;flex:1;min-height:0;container-type:inline-size;container-name:app}
.hl-app{display:flex;flex-direction:column;height:100%;background:var(--bg);color:var(--ink)}
.hl-side{display:none}
.hl-body-col{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column}

.hl-topbar{flex:none;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:20px 24px 10px}
.hl-title{margin:0;font-size:20px;font-weight:600;letter-spacing:-.01em;line-height:1.3}
.hl-date{margin:2px 0 0;font-size:13px;color:var(--ink-soft)}
.hl-sos{flex:none;display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 14px 0 12px;
  border:1px solid var(--edge);border-radius:19px;background:transparent;color:var(--ink);font-size:13px;font-weight:500;cursor:pointer}
.hl-sos svg{color:var(--primary)}

.hl-content{flex:1;min-height:0;overflow-y:auto;padding:8px 24px 40px;scrollbar-width:thin}
.hl-col{max-width:640px;margin-top:20px}
.hl-two{display:grid;gap:44px;max-width:640px;margin-top:20px}
.hl-two-side{min-width:0}
.hl-section{margin-top:44px}
.hl-h2{margin:0 0 14px;font-size:16px;font-weight:600;line-height:1.3}

/* Escritura */
.hl-verse{margin:0;font-family:var(--serif);font-weight:400;color:var(--ink);text-wrap:pretty}
.hl-verse--xl{font-size:31px;line-height:1.25;letter-spacing:-.012em;text-wrap:balance}
.hl-verse--lg{font-size:25px;line-height:1.32}
.hl-verse--md{font-size:19px;line-height:1.45}
.hl-ref{margin:12px 0 0;font-size:14px;color:var(--ink-soft)}
.hl-body{margin:20px 0 0;font-size:16px;line-height:1.55}
.hl-hint{margin:10px 0 0;font-size:13px;color:var(--ink-soft)}
.hl-cta{display:block;width:100%;margin-top:28px}

/* Botones */
.hl-btn{padding:14px 20px;border:1px solid transparent;border-radius:12px;font-size:16px;font-weight:600;line-height:1.2;cursor:pointer}
.hl-btn--primary{background:var(--primary);color:var(--on-primary)}
.hl-btn--secondary{background:transparent;color:var(--ink);border-color:var(--edge)}
.hl-link{padding:6px 0;border:0;background:none;color:var(--primary);font-size:15px;font-weight:500;text-decoration:underline;text-underline-offset:3px;cursor:pointer}

/* Check-in */
.hl-options{display:grid;gap:10px}
.hl-option{display:flex;align-items:center;gap:12px;width:100%;padding:15px 16px;border:1px solid var(--edge);border-radius:12px;
  background:transparent;color:var(--ink);font-size:16px;font-weight:500;line-height:1.3;text-align:left;cursor:pointer}
.hl-option[aria-pressed="true"]{border-color:var(--primary);background:var(--surface);box-shadow:inset 0 0 0 1px var(--primary)}
.hl-form{margin-top:22px;display:grid;gap:22px}
.hl-field-label{margin:0 0 10px;font-size:14px;font-weight:500}
.hl-chips{display:flex;flex-wrap:wrap;gap:8px}
.hl-chip{padding:8px 14px;border:1px solid var(--edge);border-radius:999px;background:transparent;color:var(--ink);font-size:14px;cursor:pointer}
.hl-chip[aria-pressed="true"]{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}
.hl-textarea{width:100%;min-height:104px;resize:vertical;padding:12px 14px;border:1px solid var(--edge);border-radius:12px;
  background:transparent;color:var(--ink);font-size:16px;line-height:1.5}
.hl-textarea::placeholder,.hl-input::placeholder{color:var(--ink-soft);opacity:.85}
.hl-count{margin:6px 0 0;text-align:right;font-size:12px;color:var(--ink-soft)}
.hl-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.hl-logged{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin:0;font-size:15px;line-height:1.5}
.hl-grace-msg{margin:16px 0 22px;font-size:15px;line-height:1.55}

/* Entradas */
.hl-entries{list-style:none;margin:0 0 8px;padding:0}
.hl-entry{display:grid;grid-template-columns:76px 1fr;gap:12px;padding:16px 0;border-top:1px solid var(--line)}
.hl-entry-date{padding-top:1px;font-size:13px;line-height:1.5;color:var(--ink-soft)}
.hl-entry-state{display:flex;align-items:center;gap:8px;margin:0;font-size:15px;font-weight:500;line-height:1.4}
.hl-entry-note{margin:6px 0 0;font-size:15px;line-height:1.5}
.hl-entry-note--clamp{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.hl-empty{margin:0;max-width:34ch;font-size:15px;line-height:1.55;color:var(--ink-soft)}
.hl-numbers{margin:4px 0 12px;font-size:13px;line-height:1.5;color:var(--ink-soft)}

/* Estudio */
.hl-steps{list-style:none;margin:22px 0 12px;padding:0}
.hl-step{position:relative;padding:0 0 24px 32px}
.hl-step::before{content:"";position:absolute;left:5px;top:10px;bottom:-6px;width:1px;background:var(--edge)}
.hl-step:last-child::before{display:none}
.hl-step::after{content:"";position:absolute;left:0;top:5px;width:11px;height:11px;border:1.5px solid var(--primary);border-radius:50%;background:var(--bg)}
.hl-step h3{margin:0;font-size:16px;font-weight:600}
.hl-step p{margin:4px 0 0;font-size:15px;line-height:1.5;color:var(--ink-soft)}

/* Piedras */
.hl-stones{list-style:none;margin:20px 0 0;padding:0}
.hl-stone{display:grid;grid-template-columns:26px 1fr;gap:8px;padding:12px 0;border-top:1px solid var(--line)}
.hl-stone p{margin:0;font-size:15px;line-height:1.5}
.hl-stone small{display:block;margin-top:2px;font-size:13px;color:var(--ink-soft)}
.hl-add{display:flex;gap:8px;margin-top:16px}
.hl-input{flex:1;min-width:0;height:48px;padding:0 14px;border:1px solid var(--edge);border-radius:12px;background:transparent;color:var(--ink);font-size:16px}
.hl-add .hl-btn{padding:0 18px}

/* Perfil */
.hl-rows{margin-top:20px}
.hl-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 0;border-top:1px solid var(--line)}
.hl-row:last-child{border-bottom:1px solid var(--line)}
.hl-row-title{margin:0;font-size:16px;font-weight:500}
.hl-row-desc{margin:4px 0 0;max-width:34ch;font-size:14px;line-height:1.5;color:var(--ink-soft)}
.hl-switch{position:relative;flex:none;width:46px;height:28px;padding:0;border:1px solid var(--edge);border-radius:14px;background:transparent;cursor:pointer;transition:background .15s}
.hl-switch::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--edge);transition:transform .15s,background .15s}
.hl-switch[aria-checked="true"]{background:var(--primary);border-color:var(--primary)}
.hl-switch[aria-checked="true"]::after{transform:translateX(18px);background:var(--on-primary)}

/* Navegación inferior (angosto) */
.hl-nav{flex:none;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:6px 8px 12px;border-top:1px solid var(--line);background:var(--bg)}
.hl-tab{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 0;border:0;border-radius:10px;background:transparent;color:var(--ink-soft);font-size:12px;font-weight:500;cursor:pointer}
.hl-tab[aria-current="page"]{color:var(--primary);font-weight:600}

/* Barra lateral (ancho) */
.hl-brand{margin:0 10px 32px;font-size:21px;font-weight:600;letter-spacing:-.02em}
.hl-sidenav{display:grid;gap:4px}
.hl-sidelink{display:flex;align-items:center;gap:12px;padding:11px 12px;border:0;border-radius:10px;background:transparent;color:var(--ink-soft);font-size:15px;font-weight:500;text-align:left;cursor:pointer}
.hl-sidelink[aria-current="page"]{background:var(--bg);color:var(--primary);font-weight:600;box-shadow:inset 0 0 0 1px var(--line)}
.hl-account{margin:auto 10px 0;font-size:13px;color:var(--ink-soft);overflow-wrap:anywhere}

/* Hoja / modal de auxilio */
.hl-overlay{position:absolute;inset:0;z-index:10;display:flex;align-items:flex-end;background:rgba(10,14,18,.55);animation:hl-fade .2s ease-out}
.hl-sheet{position:relative;width:100%;max-height:94%;overflow-y:auto;padding:60px 24px 32px;border-radius:28px 28px 0 0;background:var(--bg);animation:hl-rise .26s ease-out}
.hl-sheet-close{position:absolute;top:12px;right:12px}
.hl-iconbtn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:0;border-radius:50%;background:transparent;color:var(--ink);cursor:pointer}
.hl-prayer{margin:20px 0 0;padding:2px 0 2px 16px;border-left:2px solid var(--primary);font-size:16px;line-height:1.6}

@keyframes hl-fade{from{opacity:0}to{opacity:1}}
@keyframes hl-rise{from{transform:translateY(28px);opacity:0}to{transform:none;opacity:1}}
@keyframes hl-pop{from{transform:translateY(10px);opacity:0}to{transform:none;opacity:1}}

/* ---------- Puntos de quiebre ---------- */

/* Tablet: más aire lateral, sigue la barra inferior. El auxilio pasa a modal centrado. */
@container app (min-width:600px){
  .hl-topbar{padding-left:48px;padding-right:48px}
  .hl-content{padding-left:48px;padding-right:48px}
  .hl-verse--xl{font-size:36px}
  .hl-overlay{align-items:center;justify-content:center}
  .hl-sheet{width:min(540px,calc(100% - 48px));max-height:88%;padding:56px 40px 36px;border-radius:20px;animation:hl-pop .22s ease-out}
}

/* Escritorio: barra lateral, sin barra inferior. */
@container app (min-width:900px){
  .hl-app{flex-direction:row}
  .hl-side{display:flex;flex:none;flex-direction:column;width:232px;padding:28px 16px 24px;border-right:1px solid var(--line);background:var(--surface)}
  .hl-nav{display:none}
  .hl-topbar{padding:28px 56px 8px}
  .hl-title{font-size:24px}
  .hl-content{padding:8px 56px 64px}
  .hl-verse--xl{font-size:40px}
  .hl-cta{display:inline-block;width:auto;padding-left:28px;padding-right:28px}
}

/* Escritorio amplio: dos columnas (lo principal + lo reciente). */
@container app (min-width:1100px){
  .hl-two{max-width:1040px;grid-template-columns:minmax(0,1fr) 320px;column-gap:56px;align-items:start}
  .hl-two-side{padding-left:40px;border-left:1px solid var(--line)}
}

@media (prefers-reduced-motion:reduce){
  .hl-overlay,.hl-sheet{animation:none}
  .hl-win{transition:none}
  .holier *{transition:none!important}
}
`
