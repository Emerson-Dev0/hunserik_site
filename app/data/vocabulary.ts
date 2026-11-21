import importedVocabularyTsv from '../../vocabulario_hunsrik_portugues.txt?raw'

export type PictureType = 'home' | 'bread' | 'river' | 'tree' | 'ball' | 'family'

export type ValidationState = 'validated' | 'pending' | 'demonstrative'

export type VocabularyEntry = {
  id: string
  /** Null until the community supplies and validates an authentic form. */
  hunsrik: string | null
  portuguese: string
  category: string
  theme: string | null
  variant: string | null
  alternateForms: string[]
  source: string[]
  notes: string[]
  validationState: ValidationState
  illustration: PictureType | null
}

/**
 * Existing Portuguese demo labels, retained as visual examples. They are not
 * Hunsrik translations and are deliberately excluded from official study and games.
 */
const demoVocabulary: VocabularyEntry[] = [
  {
    id: 'demo-casa',
    hunsrik: null,
    portuguese: 'Casa',
    category: 'Casa',
    theme: 'Vida cotidiana',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'home',
  },
  {
    id: 'demo-pao-caseiro',
    hunsrik: null,
    portuguese: 'Pão caseiro',
    category: 'Comidas',
    theme: 'Vida cotidiana',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'bread',
  },
  {
    id: 'demo-rio',
    hunsrik: null,
    portuguese: 'Rio',
    category: 'Natureza',
    theme: 'Natureza',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'river',
  },
  {
    id: 'demo-arvore',
    hunsrik: null,
    portuguese: 'Árvore',
    category: 'Natureza',
    theme: 'Natureza',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'tree',
  },
  {
    id: 'demo-bola',
    hunsrik: null,
    portuguese: 'Bola',
    category: 'Brincadeiras',
    theme: 'Brincadeiras tradicionais',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'ball',
  },
  {
    id: 'demo-familia',
    hunsrik: null,
    portuguese: 'Família',
    category: 'Pessoas',
    theme: 'Família e comunidade',
    variant: null,
    alternateForms: [],
    source: [],
    notes: ['Demonstração visual preexistente; fonte linguística não informada.'],
    validationState: 'demonstrative',
    illustration: 'family',
  },
]

const ihlbriSource = 'ALTENHOFEN, Cléo Vilson; MORELLO, Rosângela (org.). Hunsrückisch: Inventário de uma Língua do Brasil. Florianópolis: Editora Garapuvu, 2018, p. 64–67 (IHLBrI). https://www.lume.ufrgs.br/bitstream/handle/10183/194384/001093148.pdf'
const alvesSource = 'ALVES, Leonardo. Code-mixing, code-switching e empréstimos no Hunsrückisch: uma análise de contato linguístico. Revista de Estudos da Linguagem, v. 34, n. 1, p. 51–80, 2026, p. 68–69. https://periodicos.ufmg.br/index.php/relin/article/download/57815/51723'

function normalizeForIdentity(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('pt-BR')
}

function parseImportedVocabulary(tsv: string): VocabularyEntry[] {
  const entries: VocabularyEntry[] = []
  let source = ihlbriSource
  let section = 'ihlbrI'

  for (const [lineIndex, line] of tsv.split(/\r?\n/).entries()) {
    if (line.startsWith('EMPRESTIMOS E ADAPTACOES')) {
      section = 'alves2026'
      source = alvesSource
      continue
    }
    if (line.startsWith('FONTES PRINCIPAIS')) break

    const fields = line.split('\t')
    if (fields[0] === 'PORTUGUES' || fields.length < 4) continue
    const [portuguese, hunsrik, category, observation] = fields
    if (![portuguese, hunsrik, category, observation].every((field) => field?.trim())) continue

    const id = `source-${section}-${lineIndex + 1}`
    entries.push({
      id,
      portuguese,
      hunsrik,
      category,
      theme: null,
      variant: null,
      alternateForms: hunsrik.includes('/') ? hunsrik.split('/').map((form) => form.trim()) : [],
      source: [source],
      notes: [observation],
      validationState: 'pending',
      illustration: null,
    })
  }

  return entries
}

function mergeDuplicateEntries(entries: VocabularyEntry[]): VocabularyEntry[] {
  const uniqueEntries = new Map<string, VocabularyEntry>()

  for (const entry of entries) {
    if (!entry.hunsrik) {
      uniqueEntries.set(entry.id, entry)
      continue
    }

    const key = `${normalizeForIdentity(entry.portuguese)}\u0000${normalizeForIdentity(entry.hunsrik)}`
    const existing = uniqueEntries.get(key)
    if (!existing) {
      uniqueEntries.set(key, entry)
      continue
    }

    existing.source = [...new Set([...existing.source, ...entry.source])]
    existing.notes = [...new Set([...existing.notes, ...entry.notes])]
  }

  return [...uniqueEntries.values()]
}

const importedVocabulary = parseImportedVocabulary(importedVocabularyTsv)
export const vocabularyImportCounts = {
  importedRows: importedVocabulary.length,
  duplicateRowsMerged: importedVocabulary.length - mergeDuplicateEntries(importedVocabulary).length,
}
export const vocabulary = mergeDuplicateEntries([...demoVocabulary, ...importedVocabulary])

export const validatedVocabulary = vocabulary.filter(
  (entry): entry is VocabularyEntry & { hunsrik: string } =>
    entry.validationState === 'validated' && Boolean(entry.hunsrik?.trim()),
)
