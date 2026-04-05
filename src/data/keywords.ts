import keywordsJson from '../../data/keywords.json';

interface KeywordItem {
  id: number;
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

const keywordsData: KeywordItem[] = keywordsJson.map((item: any, index: number) => ({
  id: item.id || index + 1,
  keyword: item.keyword,
  slug: item.slug,
  title: item.title,
  problem_description: item.problem_description,
  how_to_solve: item.how_to_solve,
}));

export { keywordsData };
export type { KeywordItem };
