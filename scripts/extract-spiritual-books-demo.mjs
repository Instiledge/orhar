import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const [catalogPath, contentDirectory, outputPath] = process.argv.slice(2);

if (!catalogPath || !contentDirectory || !outputPath) {
  console.error('Usage: node scripts/extract-spiritual-books-demo.mjs <catalog.json> <content-directory> <output.json>');
  process.exit(1);
}

const locales = ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl'];
const selections = [
  { id: 'interior_castle_teresa', excerptBlocks: [9, 13] },
  { id: 'imitation_of_christ', excerptBlocks: [2, 3] },
  { id: 'way_of_a_pilgrim', excerptBlocks: [3, 6] },
  { id: 'life_together_bonhoeffer', excerptBlocks: [2, 4] },
];

const catalog = JSON.parse(readFileSync(resolve(catalogPath), 'utf8'));
const booksById = new Map((catalog.books || []).map((book) => [book.book_id, book]));

const localized = (value, locale) => {
  if (typeof value === 'string') return value;
  return value?.[locale] || value?.en || '';
};
const compactText = (value, locale) => localized(value, locale).replace(/\s+/g, ' ').trim();

const result = selections.map(({ id, excerptBlocks }) => {
  const book = booksById.get(id);
  if (!book) throw new Error(`Book missing from catalog: ${id}`);

  const contentPath = resolve(contentDirectory, `${id}.json`);
  const content = JSON.parse(readFileSync(contentPath, 'utf8'));
  const chapter = content.chapters?.find((item) => item.chapter_number === 1);
  if (!chapter) throw new Error(`Chapter 1 missing from ${basename(contentPath)}`);

  const localeData = Object.fromEntries(locales.map((locale) => [locale, {
    title: localized(book.multilingual?.title, locale),
    author: localized(book.multilingual?.authorName || book.authorName, locale),
    description: compactText(book.multilingual?.description, locale),
    themes: (book.multilingual?.keyThemes || []).map((theme) => localized(theme, locale)).filter(Boolean),
    chapterTitle: localized(chapter.multilingual?.title, locale),
    chapterSummary: compactText(chapter.multilingual?.summary, locale),
    excerpt: excerptBlocks.map((index) => compactText(chapter.contentBlocks?.[index]?.data?.text, locale)).filter(Boolean),
  }]));

  return {
    id,
    group: book.collection_group,
    contentType: book.content_type,
    publicationYear: book.publication_year,
    tradition: book.tradition,
    traditionDetail: book.tradition_detail,
    cover: `/assets/spiritual-books/${id}.webp`,
    localeData,
  };
});

mkdirSync(dirname(resolve(outputPath)), { recursive: true });
writeFileSync(resolve(outputPath), `${JSON.stringify(result, null, 2)}\n`);
console.log(`Wrote ${result.length} spiritual-book demo records to ${resolve(outputPath)}`);
