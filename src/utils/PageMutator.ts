import { keywordsData } from '../data/keywords';

// 定义页面布局类型
export type LayoutType = 'skeptic' | 'tutorial' | 'case-study' | 'expert';

// 定义组件类型
export type ComponentType = 'ComparisonTable' | 'CodeBlock' | 'FAQSection' | 'RantSection';

// 定义语气类型
export type ToneType = 'violent' | 'analytical' | 'helpful';

// 定义语气配置接口
export interface ToneConfig {
  type: ToneType;
  name: string;
  description: string;
  generateContent: (keyword: any) => string;
}

// 语气配置
export const tones: Record<ToneType, ToneConfig> = {
  'violent': {
    type: 'violent',
    name: 'Violent',
    description: '极其激进，吐槽云厂商抢钱',
    generateContent: (keyword) => `
      Let's cut the shit. ${keyword.problem_description} is a scam perpetrated by greedy cloud providers who want to bleed you dry. 
      They charge exorbitant fees for basic services and make simple tasks unnecessarily complicated just to squeeze more money out of you. 
      
      But BillRipper? BillRipper is here to fight back. We're sick and tired of these cloud giants taking advantage of developers. 
      ${keyword.how_to_solve} 
      
      Don't let them rob you. Take control of your cloud costs with BillRipper today.
    `
  },
  'analytical': {
    type: 'analytical',
    name: 'Analytical',
    description: '冷静、客观、数据导向',
    generateContent: (keyword) => `
      ${keyword.problem_description} is a common challenge faced by developers, with significant implications for both time efficiency and cost optimization. 
      According to industry data, developers spend an average of 15-20 hours per month on manual tasks related to this issue, resulting in an estimated productivity loss of $1,200-$1,600 per developer annually. 
      
      BillRipper's approach, which ${keyword.how_to_solve.toLowerCase()}, has been shown to reduce this time by up to 90%, translating to an average savings of $1,080-$1,440 per developer per year. 
      
      This data-driven solution addresses the root cause of the problem while minimizing operational overhead.
    `
  },
  'helpful': {
    type: 'helpful',
    name: 'Helpful',
    description: '像社区老大哥一样给出建议',
    generateContent: (keyword) => `
      Hey there, fellow developer! I've been where you are. ${keyword.problem_description} used to drive me crazy too. 
      I remember spending hours trying to figure it out, only to end up frustrated and behind schedule. 
      
      Let me share a tip: ${keyword.how_to_solve} 
      
      BillRipper makes this process a breeze. It's like having a trusted teammate who's always got your back. 
      Give it a try, and you'll wonder how you ever managed without it. Happy coding!
    `
  }
};

// 页面布局模板接口
export interface PageLayout {
  type: LayoutType;
  title: string;
  intro: (keyword: any) => string;
  sections: string[];
  components: ComponentType[];
}

// 页面布局模板
export const pageLayouts: Record<LayoutType, PageLayout> = {
  'skeptic': {
    type: 'skeptic',
    title: 'Is [Tool] Really Worth It? Let\'s Break It Down',
    intro: (keyword) => `You've probably heard about tools that claim to solve [${keyword.title.toLowerCase()}], but do they actually work? Let's examine the data and see if there's a better way.`,
    sections: ['The Problem with Traditional Approaches', 'Data-Driven Analysis', 'The Truth About [Tool]', 'Why BillRipper Stands Out'],
    components: ['ComparisonTable', 'RantSection', 'FAQSection']
  },
  'tutorial': {
    type: 'tutorial',
    title: 'How to [Solve Problem] Step-by-Step',
    intro: (keyword) => `Let's walk through how to manually solve [${keyword.title.toLowerCase()}] step by step. By the end, you'll see why a tool like BillRipper can save you hours of work.`,
    sections: ['Step 1: Identify the Problem', 'Step 2: Gather Necessary Information', 'Step 3: Implement the Solution', 'Step 4: Verify the Results', 'A Better Way with BillRipper'],
    components: ['CodeBlock', 'ComparisonTable', 'FAQSection']
  },
  'case-study': {
    type: 'case-study',
    title: 'How [Name] Saved [X] Hours with BillRipper',
    intro: (keyword) => `Meet Alex, a senior developer who was spending 10+ hours a week manually [${keyword.title.toLowerCase()}]. Let's see how BillRipper transformed their workflow.`,
    sections: ['Alex\'s Pain Point', 'The Breaking Point', 'Discovering BillRipper', 'The Results', 'Lessons Learned'],
    components: ['RantSection', 'ComparisonTable', 'CodeBlock']
  },
  'expert': {
    type: 'expert',
    title: 'The Technical Deep Dive: [Problem]',
    intro: (keyword) => `Let's explore the underlying mechanics of [${keyword.title.toLowerCase()}] and how BillRipper's approach revolutionizes the process.`,
    sections: ['The Technical Challenge', 'Current Industry Approaches', 'BillRipper\'s Technical Solution', 'Performance Metrics', 'Future Implications'],
    components: ['CodeBlock', 'FAQSection', 'ComparisonTable']
  }
};

// 组件池接口
export interface ComponentConfig {
  type: ComponentType;
  title: string;
  content: (keyword: any) => string;
}

// 组件池
export const componentPool: Record<ComponentType, ComponentConfig> = {
  'ComparisonTable': {
    type: 'ComparisonTable',
    title: 'Cloud Provider vs BillRipper',
    content: (keyword) => `
      | Feature | Cloud Provider | BillRipper |
      |---------|----------------|------------|
      | Time Required | Hours | Seconds |
      | Error Rate | High | Low |
      | Cost | Expensive | Free |
      | Ease of Use | Complex | Simple |
      | Integration | Limited | Seamless |
    `
  },
  'CodeBlock': {
    type: 'CodeBlock',
    title: 'CLI Command Solution',
    content: (keyword) => {
      // 根据不同的 keyword 生成不同的代码示例
      if (keyword.slug.includes('curl')) {
        return `# Convert cURL to Axios
curl -X GET "https://api.example.com/data" \\\n  -H "Authorization: Bearer token" \\\n  -H "Content-Type: application/json"

# Equivalent Axios code
const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data', {
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}`;
      } else if (keyword.slug.includes('json')) {
        return `# Parse JSON Response
const response = '{"data": {"users": [{"id": 1, "name": "John"}]}}';

# Manual parsing
const parsedData = JSON.parse(response);
const users = parsedData.data.users;
console.log(users);

# With BillRipper
const billRipper = require('billripper');
const result = billRipper.parseJson(response, 'data.users');
console.log(result);`;
      } else {
        return `# Generic Solution
# Manual approach
const data = /* your data */;
let result = [];
for (let i = 0; i < data.length; i++) {
  // Process data
  result.push(data[i]);
}

# With BillRipper
const billRipper = require('billripper');
const result = billRipper.process(data, {/* options */});`;
      }
    }
  },
  'FAQSection': {
    type: 'FAQSection',
    title: 'Frequently Asked Questions',
    content: (keyword) => `
      **Q: How long does it take to [${keyword.title.toLowerCase()}] with BillRipper?**
      A: It typically takes just a few seconds, compared to hours with manual methods.

      **Q: Is BillRipper compatible with all cloud providers?**
      A: Yes, BillRipper works with AWS, GCP, Azure, and other major cloud providers.

      **Q: Do I need to install any software to use BillRipper?**
      A: No, BillRipper is a web-based tool that works directly in your browser.

      **Q: Is my data safe with BillRipper?**
      A: Absolutely. BillRipper processes your data locally in your browser, so it never leaves your device.
    `
  },
  'RantSection': {
    type: 'RantSection',
    title: 'Let\'s Be Real About This',
    content: (keyword) => `
      Let's cut the crap. [${keyword.title.toLowerCase()}] is a pain in the ass. 
      It's the kind of task that makes you want to throw your laptop out the window. 
      You spend hours poring over documentation, writing code that barely works, 
      and then when you finally get it right, you realize you have to do it all over again next week. 
      
      Cloud providers don't care about your time. They just want to sell you more services. 
      That's why their tools are so clunky and inefficient. They want you to waste time 
      so you'll pay for more support or higher-tier plans.
      
      But BillRipper? BillRipper gets it. We know your time is valuable. 
      That's why we built a tool that does the heavy lifting for you. 
      No more manual work. No more frustration. Just results.
    `
  }
};

// PageMutator 工具类
export class PageMutator {
  private slug: string;
  private seed: number;

  constructor(slug: string) {
    this.slug = slug;
    this.seed = this.generateSeed(slug);
  }

  // 根据 slug 生成随机种子
  private generateSeed(slug: string): number {
    let seed = 0;
    for (let i = 0; i < slug.length; i++) {
      seed = (seed * 31 + slug.charCodeAt(i)) % 1000000;
    }
    return seed;
  }

  // 生成伪随机数
  private random(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // 从数组中随机选择一个元素
  private randomChoice<T>(array: T[]): T {
    const index = Math.floor(this.random() * array.length);
    return array[index];
  }

  // 从数组中随机选择 n 个不同的元素
  private randomChoices<T>(array: T[], n: number): T[] {
    if (n >= array.length) return array;
    
    const shuffled = [...array].sort(() => this.random() - 0.5);
    return shuffled.slice(0, n);
  }

  // 获取页面布局
  getLayout(): PageLayout {
    const layoutTypes = Object.keys(pageLayouts) as LayoutType[];
    return pageLayouts[this.randomChoice(layoutTypes)];
  }

  // 获取组件列表
  getComponents(layout: PageLayout): ComponentConfig[] {
    return layout.components.map(componentType => componentPool[componentType]);
  }

  // 随机选择 2 个不同的语气
  getTones(): ToneConfig[] {
    const toneTypes = Object.keys(tones) as ToneType[];
    return this.randomChoices(toneTypes.map(type => tones[type]), 2);
  }

  // 生成标题变异
  generateTitle(keyword: any): string {
    const titleFormats = [
      // [痛点]+[年份]+[解决方案]
      () => `${keyword.title.replace('How to ', '')} in 2026: The Ultimate Solution`,
      // [动作]+[省钱金额]+[痛点]
      () => `Save $1,000+ by Solving ${keyword.title.replace('How to ', '')}`,
      // [工具名]+[动作]+[痛点]
      () => `BillRipper: The Easy Way to ${keyword.title.replace('How to ', '')}`,
      // [痛点]+[问题]+[解决方案]
      () => `${keyword.title.replace('How to ', '')}: The Common Problem and Its Solution`,
      // [动作]+[痛点]+[工具名]
      () => `Master ${keyword.title.replace('How to ', '')} with BillRipper`
    ];
    
    const format = this.randomChoice(titleFormats);
    return format();
  }

  // 生成副标题变异
  generateSubtitle(keyword: any): string {
    const subtitleFormats = [
      // [痛点]+[年份]+[解决方案]
      () => `${keyword.problem_description.substring(0, 50)}... in 2026`,
      // [动作]+[省钱金额]+[痛点]
      () => `Learn how to save time and money with ${keyword.title.replace('How to ', '')}`,
      // [工具名]+[动作]+[痛点]
      () => `BillRipper makes ${keyword.title.replace('How to ', '')} simple and fast`,
      // [痛点]+[问题]+[解决方案]
      () => `A comprehensive guide to ${keyword.title.replace('How to ', '')}`,
      // [动作]+[痛点]+[工具名]
      () => `Discover the power of BillRipper for ${keyword.title.replace('How to ', '')}`
    ];
    
    const format = this.randomChoice(subtitleFormats);
    return format();
  }

  // 生成页面数据
  generatePageData(keyword: any) {
    const layout = this.getLayout();
    const components = this.getComponents(layout);
    const selectedTones = this.getTones();
    const title = this.generateTitle(keyword);
    const subtitle = this.generateSubtitle(keyword);

    // 只有非 tutorial 布局才随机打乱 sections 顺序
    let finalSections = layout.sections;
    if (layout.type !== 'tutorial' && this.random() > 0.5) {
      finalSections = [...layout.sections].sort(() => this.random() - 0.5);
    }
    
    // 随机决定是否随机打乱组件的顺序
    const shuffledComponents = this.random() > 0.5 
      ? [...components].sort(() => this.random() - 0.5) 
      : components;

    return {
      layout,
      components: shuffledComponents,
      tones: selectedTones,
      title,
      subtitle,
      intro: layout.intro(keyword),
      sections: finalSections,
      // 添加随机布局变异标志
      layoutVariation: {
        shuffleSections: this.random() > 0.5,
        shuffleComponents: this.random() > 0.5,
        extraDivWrappers: this.random() > 0.5,
        alternateHeadingOrder: this.random() > 0.5
      }
    };
  }

  // 生成随机名字
  private getRandomName(): string {
    const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Quinn', 'Jamie'];
    return this.randomChoice(names);
  }

  // 生成随机小时数
  private getRandomHours(): string {
    const hours = ['10+', '15+', '20+', '25+', '30+'];
    return this.randomChoice(hours);
  }
}
