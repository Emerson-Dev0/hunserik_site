import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

type IconName = 'home' | 'cards' | 'sound' | 'game' | 'arrow' | 'play' | 'pause' | 'check' | 'info'

const icons: Record<IconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  cards: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h7"/></>,
  sound: <><path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12"/></>,
  game: <><path d="M7 8h10a5 5 0 0 1 4.7 6.7l-1 2.8a2.5 2.5 0 0 1-4.2.9L14.5 16h-5l-2 2.4a2.5 2.5 0 0 1-4.2-.9l-1-2.8A5 5 0 0 1 7 8Z"/><path d="M7 12v4M5 14h4M17 12h.01M19 15h.01"/></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
  play: <path d="M8 5v14l11-7z"/>,
  pause: <path d="M9 5v14M15 5v14"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
}

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
}

const navItems = [
  { to: '/', label: 'Início', icon: 'home' as IconName, end: true },
  { to: '/vocabulario', label: 'Palavras', icon: 'cards' as IconName },
  { to: '/pronuncia', label: 'Ouvir', icon: 'sound' as IconName },
  { to: '/jogos', label: 'Jogar', icon: 'game' as IconName },
]

export function AppLayout() {
  const location = useLocation()
  return (
    <div className="prototype-stage">
      <div className="mobile-app">
        <header className="mobile-header">
          <Link to="/" className="mobile-brand" aria-label="Hunsrik na Prática — início">
            <span className="logo-mark">H</span>
            <span><strong>Hunsrik</strong><small>na Prática</small></span>
          </Link>
          <div className="region-chip">SC</div>
        </header>
        <main key={location.pathname} className="screen-content"><Outlet /></main>
        <nav className="app-tabs" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? 'app-tab active' : 'app-tab'}>
              <span><Icon name={item.icon} size={21}/></span><small>{item.label}</small>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

function StatusNote() {
  return <div className="status-note"><Icon name="info" size={17}/><span><strong>Protótipo demonstrativo.</strong> Traduções e áudios finais dependem da validação de falantes locais.</span></div>
}

export function HomePage() {
  return (
    <div className="home-screen">
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="mini-label">Aprenda no seu ritmo</span>
          <h1>Vamos praticar<br/>um pouquinho?</h1>
          <p>Revise em casa o que você descobriu nas oficinas.</p>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="sun-dot"></span><span className="hill-one"></span><span className="hill-two"></span>
          <span className="little-house"><i></i></span><span className="talk-bubble">H</span>
        </div>
      </section>

      <StatusNote/>

      <section className="home-section">
        <div className="section-title"><div><span className="mini-label">Três jeitos de aprender</span><h2>O que você quer fazer?</h2></div></div>
        <div className="main-actions">
          <Link to="/vocabulario" className="main-action action-yellow">
            <span className="action-icon"><Icon name="cards" size={26}/></span>
            <span className="action-copy"><strong>Ver palavras</strong><small>Imagens e significados</small></span>
            <Icon name="arrow" size={19}/>
          </Link>
          <Link to="/pronuncia" className="main-action action-blue">
            <span className="action-icon"><Icon name="sound" size={26}/></span>
            <span className="action-copy"><strong>Escutar pronúncias</strong><small>Áudios de falantes locais</small></span>
            <Icon name="arrow" size={19}/>
          </Link>
          <Link to="/jogos" className="main-action action-coral">
            <span className="action-icon"><Icon name="game" size={26}/></span>
            <span className="action-copy"><strong>Jogar agora</strong><small>Associe imagens e palavras</small></span>
            <Icon name="arrow" size={19}/>
          </Link>
        </div>
      </section>

    </div>
  )
}

type PictureType = 'home' | 'bread' | 'river' | 'tree' | 'ball' | 'family'

function Picture({ type }: { type: PictureType }) {
  return (
    <div className={`picture picture-${type}`} aria-hidden="true">
      <span></span><i></i><b></b>
    </div>
  )
}

const vocabulary = [
  { category: 'Casa', portuguese: 'Casa', type: 'home' as PictureType },
  { category: 'Comidas', portuguese: 'Pão caseiro', type: 'bread' as PictureType },
  { category: 'Natureza', portuguese: 'Rio', type: 'river' as PictureType },
  { category: 'Natureza', portuguese: 'Árvore', type: 'tree' as PictureType },
  { category: 'Brincadeiras', portuguese: 'Bola', type: 'ball' as PictureType },
  { category: 'Pessoas', portuguese: 'Família', type: 'family' as PictureType },
]

const categories = ['Todas', 'Casa', 'Comidas', 'Natureza', 'Brincadeiras', 'Pessoas']

export function VocabularyPage() {
  const [category, setCategory] = useState('Todas')
  const visible = vocabulary.filter((item) => category === 'Todas' || item.category === category)
  return (
    <div className="page-screen">
      <section className="page-heading">
        <span className="mini-label">Vocabulário</span>
        <h1>Palavras para revisar</h1>
        <p>Escolha uma categoria e descubra palavras do cotidiano.</p>
      </section>
      <div className="category-scroll" aria-label="Categorias">
        {categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <StatusNote/>
      <div className="vocabulary-grid">
        {visible.map((item) => (
          <article className="vocabulary-card" key={item.portuguese}>
            <Picture type={item.type}/>
            <span className="card-category">{item.category}</span>
            <h2>{item.portuguese}</h2>
            <div className="translation-row">
              <div><small>Português</small><strong>{item.portuguese}</strong></div>
              <div><small>Hunsrik</small><strong className="pending">A validar</strong></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const recordings = [
  { title: 'Casa', category: 'Casa', speaker: 'Falante local 01', duration: '0:03', type: 'home' as PictureType },
  { title: 'Pão caseiro', category: 'Comidas', speaker: 'Falante local 02', duration: '0:04', type: 'bread' as PictureType },
  { title: 'Rio', category: 'Natureza', speaker: 'Falante local 01', duration: '0:03', type: 'river' as PictureType },
  { title: 'Árvore', category: 'Natureza', speaker: 'Falante local 03', duration: '0:04', type: 'tree' as PictureType },
]

function AudioCard({ item }: { item: (typeof recordings)[number] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setPlaying(false)
          return 0
        }
        return value + 5
      })
    }, 120)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <article className="audio-card">
      <Picture type={item.type}/>
      <div className="audio-details">
        <span className="card-category">{item.category}</span><h2>{item.title}</h2>
        <p><span className="speaker-dot"></span>{item.speaker} · demonstração</p>
        <div className="player">
          <button onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pausar demonstração' : 'Reproduzir demonstração'}><Icon name={playing ? 'pause' : 'play'} size={18}/></button>
          <span className="player-track"><i style={{ width: `${progress}%` }}></i></span><small>{item.duration}</small>
        </div>
      </div>
    </article>
  )
}

export function PronunciationPage() {
  return (
    <div className="page-screen">
      <section className="page-heading">
        <span className="mini-label">Pronúncia</span>
        <h1>Escute com atenção</h1>
        <p>Ouça, repita e compare no seu ritmo.</p>
      </section>
      <div className="audio-explainer"><div className="sound-pulse"><Icon name="sound" size={25}/></div><p>Os controles abaixo simulam a reprodução. Na versão final, cada faixa terá uma gravação validada da comunidade.</p></div>
      <div className="audio-list">
        {recordings.map((item) => <AudioCard item={item} key={item.title}/>)}
      </div>
    </div>
  )
}

const questions = [
  { prompt: 'Qual palavra combina com esta imagem?', answer: 'Casa', options: ['Árvore', 'Casa', 'Rio'], type: 'home' as PictureType },
  { prompt: 'O que aparece nesta imagem?', answer: 'Pão caseiro', options: ['Bola', 'Pão caseiro', 'Casa'], type: 'bread' as PictureType },
  { prompt: 'Escolha a palavra correta.', answer: 'Árvore', options: ['Rio', 'Família', 'Árvore'], type: 'tree' as PictureType },
]

export function GamesPage() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const question = questions[step]
  const correct = selected === question.answer

  function next() {
    if (step === questions.length - 1) {
      setFinished(true)
    } else {
      setStep((value) => value + 1)
      setSelected(null)
    }
  }

  function restart() {
    setStep(0)
    setSelected(null)
    setFinished(false)
  }

  return (
    <div className="page-screen game-screen">
      <section className="page-heading">
        <span className="mini-label">Jogo de associação</span>
        <h1>Imagem + palavra</h1>
        <p>Rodada demonstrativa em português.</p>
      </section>
      {!finished ? (
        <section className="quiz-card">
          <div className="quiz-progress"><span>{step + 1} de {questions.length}</span><div><i style={{ width: `${((step + 1) / questions.length) * 100}%` }}></i></div></div>
          <div className="quiz-picture"><Picture type={question.type}/></div>
          <h2>{question.prompt}</h2>
          <div className="quiz-options">
            {question.options.map((option) => {
              const state = selected === option ? (option === question.answer ? 'correct' : 'wrong') : selected && option === question.answer ? 'correct reveal' : ''
              return <button key={option} className={state} disabled={selected !== null} onClick={() => setSelected(option)}><span>{option}</span>{state.includes('correct') && <Icon name="check" size={19}/>}</button>
            })}
          </div>
          {selected && <div className={correct ? 'quiz-feedback success' : 'quiz-feedback'}><strong>{correct ? 'Muito bem!' : 'Quase!'}</strong><span>{correct ? 'Você encontrou a palavra certa.' : `A resposta correta é “${question.answer}”.`}</span></div>}
          {selected && <button className="primary-button" onClick={next}>{step === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}<Icon name="arrow" size={18}/></button>}
        </section>
      ) : (
        <section className="result-card">
          <div className="result-mark"><Icon name="check" size={38}/></div>
          <span className="mini-label">Rodada concluída</span><h2>Você chegou ao fim!</h2>
          <p>Este quiz demonstra como as crianças poderão associar imagens às palavras validadas nas oficinas.</p>
          <button className="primary-button" onClick={restart}>Jogar novamente</button>
          <Link to="/vocabulario" className="secondary-link">Revisar vocabulário</Link>
        </section>
      )}
    </div>
  )
}
