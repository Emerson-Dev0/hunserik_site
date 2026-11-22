import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { vocabulary, vocabularyImportCounts, type PictureType, type ValidationState, type VocabularyEntry } from './data/vocabulary'
import logo from '../Logo_teste.jpeg'

type IconName = 'home' | 'cards' | 'sound' | 'game' | 'arrow' | 'play' | 'pause' | 'check' | 'info' | 'search' | 'close'

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
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  close: <path d="m18 6-12 12M6 6l12 12"/>,
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
            <img className="logo-mark" src={logo} alt="" />
            <span><strong>Hunsrik</strong><small>na Prática</small></span>
          </Link>
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

function Picture({ type }: { type: PictureType }) {
  return (
    <div className={`picture picture-${type}`} aria-hidden="true">
      <span></span><i></i><b></b>
    </div>
  )
}

function categoryGroupFor(category: string) {
  const root = category.split('/')[0].trim().toLocaleLowerCase('pt-BR')
  const commonGroups: Record<string, string> = {
    comidas: 'Alimentação',
    alimentação: 'Alimentação',
    família: 'Pessoas e família',
    pessoas: 'Pessoas e família',
  }
  return commonGroups[root] ?? `${root.charAt(0).toLocaleUpperCase('pt-BR')}${root.slice(1)}`
}

const featuredCategoryOrder = ['Verbos', 'Expressões', 'Alimentação', 'Pessoas e família', 'Animais', 'Natureza', 'Descrições']
const categoryGroups = [...vocabulary.reduce((groups, entry) => {
  const label = categoryGroupFor(entry.category)
  groups.set(label, (groups.get(label) ?? 0) + 1)
  return groups
}, new Map<string, number>())]
  .map(([label, count]) => ({ label, count }))
  .sort((left, right) => {
    const leftPriority = featuredCategoryOrder.indexOf(left.label)
    const rightPriority = featuredCategoryOrder.indexOf(right.label)
    if (leftPriority >= 0 || rightPriority >= 0) {
      if (leftPriority < 0) return 1
      if (rightPriority < 0) return -1
      return leftPriority - rightPriority
    }
    return right.count - left.count || left.label.localeCompare(right.label, 'pt-BR')
  })

function validationLabel(state: ValidationState) {
  if (state === 'validated') return 'Validada'
  if (state === 'pending') return 'Pendente'
  return 'Demonstrativo'
}

function WordDetail({ entry, onClose }: { entry: VocabularyEntry; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
    closeRef.current?.focus()
  }, [])

  return (
    <dialog ref={dialogRef} className="word-dialog" aria-labelledby="word-detail-title" onClose={onClose}>
      <div className="word-dialog-header">
        <span className="mini-label">Detalhes do registro</span>
        <button ref={closeRef} className="icon-button" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar detalhes">
          <Icon name="close" size={19}/>
        </button>
      </div>
      {entry.illustration ? <Picture type={entry.illustration}/> : <span className="word-picture-placeholder" aria-hidden="true">Registro bibliográfico</span>}
      <h2 id="word-detail-title">{entry.portuguese}</h2>
      <dl className="word-detail-list">
        <div><dt>Referência em português</dt><dd>{entry.portuguese}</dd></div>
        <div><dt>Forma em Hunsrik</dt><dd>{entry.hunsrik ?? 'Ainda não cadastrada'}</dd></div>
        <div><dt>Categoria</dt><dd>{entry.category}</dd></div>
        <div><dt>Tema</dt><dd>{entry.theme ?? 'Não informado na fonte'}</dd></div>
        <div><dt>Variante regional</dt><dd>{entry.variant ?? 'Não especificada na fonte'}</dd></div>
        {entry.alternateForms.length > 0 && <div><dt>Variantes registradas</dt><dd>{entry.alternateForms.join(' / ')}</dd></div>}
        <div><dt>Fonte bibliográfica</dt><dd>{entry.source.length > 0 ? entry.source.map((source) => <span className="source-citation" key={source}>{source}</span>) : 'Não informada'}</dd></div>
        {entry.notes.length > 0 && <div><dt>Observações da fonte</dt><dd>{entry.notes.map((note, index) => <span className="source-citation" key={`${entry.id}-note-${index}`}>{note}</span>)}</dd></div>}
        <div><dt>Validação</dt><dd><span className={`validation-badge state-${entry.validationState}`}>{validationLabel(entry.validationState)}</span></dd></div>
      </dl>
      <p className="detail-disclaimer">{entry.validationState === 'validated' ? 'Registro revisado e validado.' : entry.validationState === 'pending' ? 'Registro importado de fonte bibliográfica e pendente de revisão por falantes da comunidade.' : 'Este registro é apenas demonstrativo e não representa uma tradução Hunsrik validada.'}</p>
    </dialog>
  )
}

export function VocabularyPage() {
  const [category, setCategory] = useState('Todas')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<VocabularyEntry | null>(null)
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
  const visible = vocabulary.filter((entry) => {
    const matchesCategory = category === 'Todas' || categoryGroupFor(entry.category) === category
    const searchableText = [entry.hunsrik, entry.portuguese, entry.category, entry.theme, entry.variant, ...entry.alternateForms, ...entry.source, ...entry.notes]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('pt-BR')
    return matchesCategory && searchableText.includes(normalizedQuery)
  })

  return (
    <div className="page-screen">
      <section className="page-heading">
        <span className="mini-label">Vocabulário</span>
        <h1>Biblioteca de palavras</h1>
        <p>Pesquise referências e consulte a origem e a validação de cada registro.</p>
      </section>
      <label className="vocabulary-search">
        <Icon name="search" size={19}/>
        <span className="sr-only">Pesquisar na biblioteca</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar palavra, categoria ou tema" />
      </label>
      <div className="category-section">
        <div className="category-section-heading"><span className="filter-label">Aprenda por categoria</span><span>{categoryGroups.length} categorias</span></div>
        <div className="category-card-grid" aria-label="Categorias da biblioteca">
          <button type="button" aria-pressed={category === 'Todas'} className={`category-card ${category === 'Todas' ? 'active' : ''}`} onClick={() => setCategory('Todas')}>
            <span className="category-card-title">Todas</span><span className="category-card-count">{vocabulary.length} registros</span>
          </button>
          {(showAllCategories ? categoryGroups : categoryGroups.slice(0, 7)).map((item) => (
            <button key={item.label} type="button" aria-pressed={category === item.label} className={`category-card ${category === item.label ? 'active' : ''}`} onClick={() => setCategory(item.label)}>
              <span className="category-card-title">{item.label}</span><span className="category-card-count">{item.count} {item.count === 1 ? 'registro' : 'registros'}</span>
            </button>
          ))}
        </div>
        {categoryGroups.length > 7 && <button className="category-expand" type="button" aria-expanded={showAllCategories} onClick={() => setShowAllCategories((value) => !value)}>{showAllCategories ? 'Mostrar categorias principais' : `Ver todas as ${categoryGroups.length} categorias`}</button>}
      </div>
      <div className="library-status" role="status">
        <Icon name="info" size={18}/>
        <span><strong>{vocabularyImportCounts.importedRows - vocabularyImportCounts.duplicateRowsMerged} registros bibliográficos pendentes.</strong> Nenhuma entrada importada é material oficial antes da validação comunitária.</span>
      </div>
      <p className="library-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'registro encontrado' : 'registros encontrados'}</p>
      <div className="vocabulary-grid">
        {visible.map((entry) => (
          <article className="vocabulary-card" key={entry.id}>
            <button className="word-card-button" type="button" onClick={() => setSelectedEntry(entry)} aria-label={`Ver detalhes de ${entry.portuguese}`}>
              {entry.illustration ? <Picture type={entry.illustration}/> : <span className="word-picture-placeholder" aria-hidden="true">Registro bibliográfico</span>}
              <span className="card-category">{entry.category}</span>
              <h2>{entry.portuguese}</h2>
              <span className="word-card-hunsrik">Hunsrik <strong>{entry.hunsrik ?? 'Não cadastrado'}</strong></span>
              <span className={`validation-badge state-${entry.validationState}`}>{validationLabel(entry.validationState)}</span>
              {entry.alternateForms.length > 0 && <span className="word-card-variants">Variantes: {entry.alternateForms.join(' / ')}</span>}
              <span className="word-card-more">Ver fonte e detalhes <Icon name="arrow" size={15}/></span>
            </button>
          </article>
        ))}
      </div>
      {visible.length === 0 && <div className="empty-state"><Icon name="search" size={25}/><h2>Nenhum registro encontrado</h2><p>Tente outro termo ou remova um dos filtros.</p></div>}
      {selectedEntry && <WordDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)}/>}
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

type GameDifficulty = 'iniciante' | 'intermediário' | 'avançado'
type PlayableVocabularyEntry = VocabularyEntry & { hunsrik: string }
type GameQuestion = { entry: PlayableVocabularyEntry; options: PlayableVocabularyEntry[] }

const gameVocabulary = vocabulary.filter(
  (entry): entry is PlayableVocabularyEntry => Boolean(entry.hunsrik?.trim() && entry.portuguese.trim()),
)

const difficultySettings: { id: GameDifficulty; label: string; requiredPairs: number; optionCount: number }[] = [
  { id: 'iniciante', label: 'Iniciante', requiredPairs: 3, optionCount: 3 },
  { id: 'intermediário', label: 'Intermediário', requiredPairs: 5, optionCount: 4 },
  { id: 'avançado', label: 'Avançado', requiredPairs: 8, optionCount: 5 },
]

function shuffled<T>(items: T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

function createGameRound(entries: PlayableVocabularyEntry[], difficulty: GameDifficulty): GameQuestion[] {
  const settings = difficultySettings.find((item) => item.id === difficulty)
  if (!settings || entries.length < settings.requiredPairs) return []

  return shuffled(entries).slice(0, 5).map((entry) => {
    const distractors = shuffled(entries.filter((candidate) => candidate.id !== entry.id))
      .slice(0, settings.optionCount - 1)
    return { entry, options: shuffled([entry, ...distractors]) }
  })
}

export function GamesPage() {
  const availableDifficulties = difficultySettings.filter((item) => gameVocabulary.length >= item.requiredPairs)
  const initialDifficulty = availableDifficulties.at(-1)?.id ?? 'iniciante'
  const [difficulty, setDifficulty] = useState<GameDifficulty>(initialDifficulty)
  const [round, setRound] = useState<GameQuestion[]>(() => createGameRound(gameVocabulary, initialDifficulty))
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const question = round[step]
  const isCorrect = selected !== null && selected === question?.entry.id

  function resetRound(nextDifficulty = difficulty) {
    setDifficulty(nextDifficulty)
    setRound(createGameRound(gameVocabulary, nextDifficulty))
    setStep(0)
    setSelected(null)
    setCorrectCount(0)
    setFinished(false)
  }

  function answer(entryId: string) {
    if (selected !== null) return
    setSelected(entryId)
    if (entryId === question?.entry.id) setCorrectCount((count) => count + 1)
  }

  function next() {
    if (step === round.length - 1) {
      setFinished(true)
    } else {
      setStep((value) => value + 1)
      setSelected(null)
    }
  }

  return (
    <div className="page-screen game-screen">
      <section className="page-heading">
        <span className="mini-label">Jogo de associação</span>
        <h1>Combine as palavras</h1>
        <p>Leia a palavra em Hunsrik e escolha o significado em português.</p>
      </section>
      {gameVocabulary.length > 0 && <p className="game-content-note" role="note">Modo demonstração: usando {gameVocabulary.length} pares importados, ainda pendentes de revisão. As respostas não são apresentadas como conteúdo oficial.</p>}
      {availableDifficulties.length === 0 ? (
        <section className="empty-state game-empty-state" role="status">
          <Icon name="game" size={30}/>
          <h2>A biblioteca ainda não tem pares para jogar</h2>
          <p>São necessários ao menos 3 registros com palavra em Hunsrik e referência em português para criar uma partida.</p>
          <Link to="/vocabulario" className="primary-button">Ver biblioteca de palavras</Link>
        </section>
      ) : !finished && question ? (
        <section className="quiz-card">
          <div className="game-levels" aria-label="Nível de dificuldade">
            {difficultySettings.map((level) => {
              const unlocked = availableDifficulties.some((available) => available.id === level.id)
              return <button key={level.id} type="button" className={difficulty === level.id ? 'category active' : 'category'} disabled={!unlocked} aria-pressed={difficulty === level.id} onClick={() => resetRound(level.id)}>{level.label}{!unlocked && ` · ${level.requiredPairs} pares`}</button>
            })}
          </div>
          <div className="quiz-progress"><span>Pergunta {step + 1} de {round.length}</span><div><i style={{ width: `${((step + 1) / round.length) * 100}%` }}></i></div></div>
          <div className="game-score"><span>Acertos <strong>{correctCount}</strong></span><span>Pontos <strong>{correctCount * 10}</strong></span></div>
          <div className="match-prompt"><span>Qual é o significado de</span><strong lang="de">{question.entry.hunsrik}</strong></div>
          <div className="quiz-options">
            {question.options.map((option) => {
              const state = selected === option.id ? (option.id === question.entry.id ? 'correct' : 'wrong') : selected && option.id === question.entry.id ? 'correct reveal' : ''
              return <button key={option.id} className={state} disabled={selected !== null} onClick={() => answer(option.id)}><span>{option.portuguese}</span>{state.includes('correct') && <Icon name="check" size={19}/>}</button>
            })}
          </div>
          {selected && <div className={isCorrect ? 'quiz-feedback success' : 'quiz-feedback'} role="status"><strong>{isCorrect ? 'Muito bem!' : 'Quase!'}</strong><span>{isCorrect ? 'Resposta correta. Você marcou 10 pontos.' : `A resposta correta é “${question.entry.portuguese}”.`}</span></div>}
          {selected && <button className="primary-button" onClick={next}>{step === round.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}<Icon name="arrow" size={18}/></button>}
        </section>
      ) : (
        <section className="result-card">
          <div className="result-mark"><Icon name="check" size={38}/></div>
          <span className="mini-label">Rodada concluída</span><h2>Você chegou ao fim!</h2>
          <p>Você acertou {correctCount} de {round.length} e fez {correctCount * 10} pontos.</p>
          <button className="primary-button" onClick={() => resetRound()}>Jogar novamente</button>
          <Link to="/vocabulario" className="secondary-link">Revisar vocabulário</Link>
        </section>
      )}
    </div>
  )
}
