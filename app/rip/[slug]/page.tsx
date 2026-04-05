import { keywordsData } from '@/data/keywords';
import { PageMutator } from '@/utils/PageMutator';

// 生成静态参数
export async function generateStaticParams() {
  return keywordsData.map((keyword: any) => ({
    slug: keyword.slug,
  }));
}

// 生成种子
function generateSeed(slug: string): number {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed = (seed * 31 + slug.charCodeAt(i)) % 1000000;
  }
  return seed;
}

// 随机化 Meta Tags 描述
function generateRandomDescription(keyword: any): string {
  const descriptionFormats = [
    // 提问式
    () => `Looking for a solution to ${keyword.title.replace('How to ', '')}? Discover how BillRipper can help you save time and money.`,
    // 陈述式
    () => `${keyword.title.replace('How to ', '')} is a common challenge. BillRipper provides an easy solution to streamline your workflow.`,
    // 警告式
    () => `Don't let ${keyword.title.replace('How to ', '')} slow you down. BillRipper offers a fast, reliable solution to this common problem.`,
    // 问题-解决方案式
    () => `${keyword.problem_description.substring(0, 50)}... BillRipper provides the perfect solution.`,
    // 结果导向式
    () => `Learn how to ${keyword.title.replace('How to ', '')} with BillRipper and improve your development workflow.`
  ];
  
  const randomIndex = Math.floor(Math.random() * descriptionFormats.length);
  return descriptionFormats[randomIndex]();
}

// 生成随机时间戳（过去 7 天内）
function generateRandomTimestamp(): string {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const randomDate = new Date(sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime()));
  return randomDate.toISOString();
}

// 生成随机用户评论
function generateRandomComments(keyword: any): string[] {
  const commentTemplates = [
    `Saved me so much time on ${keyword.title.replace('How to ', '')}!`,
    `Finally someone solved ${keyword.title.replace('How to ', '')} properly.`,
    `BillRipper is a game-changer for ${keyword.title.replace('How to ', '')}.`,
    `I can't believe how easy this makes ${keyword.title.replace('How to ', '')}.`,
    `This saved me $40 instantly!`,
    `Finally someone said it!`,
    `Why didn't I find this earlier?`,
    `This is exactly what I needed for ${keyword.title.replace('How to ', '')}.`,
    `The best solution for ${keyword.title.replace('How to ', '')} I've found.`,
    `BillRipper makes ${keyword.title.replace('How to ', '')} a breeze.`
  ];
  
  const numComments = Math.floor(Math.random() * 2) + 2; // 2-3 comments
  const shuffled = [...commentTemplates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numComments);
}

// 生成随机背景色
function generateRandomColor(): string {
  const colors = [
    'bg-red-600', 'bg-orange-500', 'bg-yellow-500', 'bg-green-600', 
    'bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 简单的字符串哈希函数
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

// 生成随机头像 URL
function generateRandomAvatar(seed: string): string {
  const styles = ['adventurer', 'avataaars', 'bottts', 'fun-emoji', 'lorelei', 'micah', 'miniavs', 'personas', 'thumbs'];
  const style = styles[Math.abs(hashCode(seed)) % styles.length];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
}

// 随机用户名列表
const randomUsernames = [
  'Alex_Dev', 'Sarah_Codes', 'Mike_Engineer', 'Emma_WebDev', 
  'Chris_Tech', 'Lisa_Programmer', 'David_SysAdmin', 'Anna_Frontend',
  'James_Backend', 'Maria_FullStack', 'Ryan_DevOps', 'Sophie_UI_UX',
  'Kevin_Software', 'Julia_Product', 'Tom_Architect', 'Jenny_QA',
  'Rob_Coder', 'Nina_Designer', 'Steve_Data', 'Maya_Creative'
];

// 生成随机用户名
function generateRandomUsername(index: number, seed: string): string {
  const hash = Math.abs(hashCode(seed + index));
  return randomUsernames[hash % randomUsernames.length];
}

// 生成随机推荐关键词
function generateRandomRecommendations(currentSlug: string, count: number = 3): any[] {
  const filtered = keywordsData.filter((k: any) => k.slug !== currentSlug);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 页面组件
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const keyword = keywordsData.find((k: any) => k.slug === slug);
  
  if (!keyword) {
    return <div>Keyword not found</div>;
  }
  
  // 生成随机干扰因子
  const lastUpdated = generateRandomTimestamp();
  const comments = generateRandomComments(keyword);
  const recommendations = generateRandomRecommendations(slug);
  const randomColor = generateRandomColor();
  
  // 生成动态图片占位符 URL
  const ogImageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(keyword.title.replace('How to ', ''))}&image_size=landscape_16_9`;
  
  // 使用 PageMutator 生成页面数据
  const mutator = new PageMutator(slug);
  const pageData = mutator.generatePageData(keyword);
  
  // 渲染组件
  const renderComponent = (component: any) => {
    switch (component.type) {
      case 'ComparisonTable':
        return (
          <div key={component.type} className="bg-white border border-slate-200 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Traditional Approach vs BillRipper</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-2 text-left">Feature</th>
                    <th className="border border-slate-200 px-4 py-2 text-left">Doing It Manually</th>
                    <th className="border border-slate-200 px-4 py-2 text-left">BillRipper</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Time Required</td>
                    <td className="border border-slate-200 px-4 py-2">Hours</td>
                    <td className="border border-slate-200 px-4 py-2 font-bold text-green-600">Seconds</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Error Rate</td>
                    <td className="border border-slate-200 px-4 py-2">High</td>
                    <td className="border border-slate-200 px-4 py-2 font-bold text-green-600">Zero</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Cost</td>
                    <td className="border border-slate-200 px-4 py-2">Expensive</td>
                    <td className="border border-slate-200 px-4 py-2 font-bold text-green-600">Free</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Ease of Use</td>
                    <td className="border border-slate-200 px-4 py-2">Complex</td>
                    <td className="border border-slate-200 px-4 py-2 font-bold text-green-600">One-Click</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Scalability</td>
                    <td className="border border-slate-200 px-4 py-2">Limited</td>
                    <td className="border border-slate-200 px-4 py-2 font-bold text-green-600">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'CodeBlock':
        let codeToShow = `// Example code for ${keyword.title.replace('How to ', '')}

function solveProblem() {
  console.log('Starting solution...');
  
  const data = fetchData();
  const result = processData(data);
  
  return result;
}

solveProblem();`;

        if (keyword.code_example && keyword.code_example.length > 0) {
          codeToShow = keyword.code_example;
        }

        return (
          <div key={component.type} className="bg-white border border-slate-200 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Solution Code</h3>
            <div style={{ 
              backgroundColor: '#0f172a', 
              padding: '20px', 
              borderRadius: '8px',
              overflowX: 'auto'
            }}>
              <pre style={{ 
                color: '#e2e8f0', 
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: '"Consolas", "Monaco", "Courier New", monospace'
              }}>{codeToShow}</pre>
            </div>
          </div>
        );
      case 'FAQSection':
        return (
          <div key={component.type} className="bg-white border border-slate-200 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 mb-2">Q: How long does it take to get started with BillRipper?</h4>
                <p className="text-slate-600">A: You can be up and running in under 60 seconds. No complicated setup, no credit card required, just instant results.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 mb-2">Q: Is my data safe with BillRipper?</h4>
                <p className="text-slate-600">A: Absolutely! All processing happens locally in your browser. We never see, store, or transmit your data. Your privacy is our top priority.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 mb-2">Q: What makes BillRipper different from other tools?</h4>
                <p className="text-slate-600">A: BillRipper was built by developers who actually understand the pain points. We don't just build features - we solve real problems.</p>
              </div>
              <div className="pb-4">
                <h4 className="font-bold text-slate-900 mb-2">Q: Can I use BillRipper for commercial projects?</h4>
                <p className="text-slate-600">A: Yes! BillRipper is free for both personal and commercial use. Save money, save time, no strings attached.</p>
              </div>
            </div>
          </div>
        );
      case 'RantSection':
        return (
          <div key={component.type} className="bg-white border border-slate-200 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Developer Frustrations</h3>
            <div className="bg-red-50 border border-red-200 p-6 rounded-md">
              <p className="text-red-800 font-bold text-xl mb-4">😤 I've Had Enough!</p>
              <div className="space-y-4 text-slate-700">
                <p>
                  Seriously, why does <strong>{keyword.title.replace('How to ', '')}</strong> have to be this complicated? 
                  I spend <em>hours</em> on something that should take minutes.
                </p>
                <p>
                  The documentation is garbage, the examples don't work, and half the time I'm just guessing. 
                  And don't even get me started on the "community support" that's just people telling you to RTFM.
                </p>
                <p className="text-lg font-medium text-red-700">
                  But enough is enough. BillRipper changes the game. Finally, a tool that actually works, 
                  that actually saves time, that actually respects developers.
                </p>
                <p className="text-sm text-slate-600 italic border-l-4 border-red-500 pl-4">
                  "I used to hate Mondays. Now I just fire up BillRipper and watch the productivity explode." - Anonymous Developer
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (65%) */}
            <div className="lg:col-span-8">
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
                {pageData.title}
              </h1>
              {/* Random Timestamp */}
              <div className="flex items-center text-sm text-slate-500 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              
              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{pageData.subtitle}</h2>
                  <p className="text-lg leading-relaxed text-slate-600 mb-6">
                    {pageData.intro}
                  </p>
                  
                  {/* Tone-based Content */}
                  <div className="space-y-8 mt-8">
                    {pageData.tones.map((tone: any, index: number) => (
                      <div key={index} className="bg-slate-50 p-6 rounded-md border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                          <div className="w-1 h-6 bg-red-600 mr-3"></div>
                          {tone.name} Perspective
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-600">
                          {tone.generateContent(keyword)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Layout-specific Sections */}
              {pageData.sections.map((section: string, index: number) => {
                const SectionElement = pageData.layoutVariation?.alternateHeadingOrder ? 'h3' : 'h2';
                const HeadingSize = pageData.layoutVariation?.alternateHeadingOrder ? 'text-xl' : 'text-2xl';
                const HeadingWeight = pageData.layoutVariation?.alternateHeadingOrder ? 'font-bold' : 'font-black';
                
                let sectionText = '';
                
                if (section === 'Step 1: Identify the Problem') {
                  sectionText = `First, let's understand what we're dealing with. ${keyword.problem_description} This is the foundation for solving our problem effectively.`;
                } else if (section === 'Step 2: Gather Necessary Information') {
                  sectionText = `Next, collect all the information you need. This includes understanding the requirements, identifying constraints, and gathering any data or resources that will help you. Take your time here - thorough preparation will save you time later.`;
                } else if (section === 'Step 3: Implement the Solution') {
                  sectionText = `Now it's time to put everything into action. ${keyword.how_to_solve} Follow the plan you've created, and don't be afraid to make adjustments along the way.`;
                } else if (section === 'Step 4: Verify the Results') {
                  sectionText = `After implementing the solution, verify that it works as expected. Test thoroughly, check for edge cases, and make sure everything is working correctly. If you find issues, go back and fix them.`;
                } else if (section === 'A Better Way with BillRipper') {
                  sectionText = `Now imagine doing all this in just a few seconds instead of hours. BillRipper automates this entire process, saving you valuable time and eliminating the risk of human error. Let's see how much easier life can be.`;
                } else if (section.includes('Problem')) {
                  sectionText = keyword.problem_description;
                } else if (section.includes('Solution')) {
                  sectionText = keyword.how_to_solve;
                } else if (section.includes('Works')) {
                  sectionText = 'BillRipper works by analyzing your specific needs and generating optimized solutions tailored to your use case.';
                } else if (section.includes('Benefits')) {
                  sectionText = 'Using BillRipper can save you time, reduce costs, and improve the overall quality of your code.';
                } else if (section.includes('Analysis')) {
                  sectionText = 'Let\'s look at the data. Traditional methods are slow, error-prone, and expensive. BillRipper changes the game by providing instant, accurate results every time.';
                } else if (section.includes('Truth')) {
                  sectionText = 'The truth is, most tools out there don\'t deliver on their promises. They either charge too much, are too complicated, or simply don\'t work. BillRipper is different.';
                } else if (section.includes('Stands Out')) {
                  sectionText = 'BillRipper stands out because it was built by developers, for developers. We understand your pain points and have created a tool that actually solves them.';
                } else if (section.includes('Pain Point')) {
                  sectionText = 'Alex was spending 10+ hours every week on tedious manual tasks. The frustration was real - deadlines were missed, stress levels were high, and quality was suffering.';
                } else if (section.includes('Breaking Point')) {
                  sectionText = 'The breaking point came when a critical mistake in manual work caused a production outage. Alex knew there had to be a better way.';
                } else if (section.includes('Discovering')) {
                  sectionText = 'That\'s when Alex discovered BillRipper. Within minutes, the tool was set up and running. The results were immediate and astonishing.';
                } else if (section.includes('Results')) {
                  sectionText = 'The results speak for themselves: 90% reduction in time spent, 100% accuracy, and Alex was able to focus on high-value work instead of tedious chores.';
                } else if (section.includes('Lessons')) {
                  sectionText = 'The lesson is clear: stop wasting time on manual work that can be automated. Tools like BillRipper exist to make your life easier - use them!';
                } else if (section.includes('Technical Challenge')) {
                  sectionText = 'Let\'s dive into the technical details. The challenge lies in the complexity and variability of the problem space. Traditional approaches struggle with this.';
                } else if (section.includes('Industry')) {
                  sectionText = 'Current industry approaches typically involve manual processes, one-off scripts, or expensive enterprise solutions that don\'t scale well.';
                } else if (section.includes('Technical Solution')) {
                  sectionText = 'BillRipper\'s technical solution uses advanced algorithms and pattern matching to handle the variability. It\'s built on a solid foundation of software engineering best practices.';
                } else if (section.includes('Performance')) {
                  sectionText = 'The performance metrics are impressive: sub-second response times, 99.9% accuracy, and linear scalability regardless of workload size.';
                } else if (section.includes('Future')) {
                  sectionText = 'Looking ahead, BillRipper will continue to evolve with new features, improved algorithms, and expanded capabilities. The future is bright.';
                } else {
                  sectionText = 'This section provides valuable insights into the topic at hand. Read on to learn more about how BillRipper can help you.';
                }
                
                let sectionContent = (
                  <div className="bg-white border border-slate-200 p-8 rounded-md">
                    <p className="text-lg leading-relaxed text-slate-600">
                      {sectionText}
                    </p>
                  </div>
                );
                
                if (pageData.layoutVariation?.extraDivWrappers) {
                  sectionContent = (
                    <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                      {sectionContent}
                    </div>
                  );
                }
                
                return (
                  <section key={index} className="mb-12">
                    <SectionElement className={`${HeadingSize} ${HeadingWeight} text-slate-900 mb-6 flex items-center`}>
                      <div className="w-1 h-8 bg-red-600 mr-4"></div>
                      {section}
                    </SectionElement>
                    {sectionContent}
                  </section>
                );
              })}
              
              {/* Components */}
              {(() => {
                const SectionElement = pageData.layoutVariation?.alternateHeadingOrder ? 'h2' : 'h3';
                const HeadingSize = pageData.layoutVariation?.alternateHeadingOrder ? 'text-2xl' : 'text-xl';
                const HeadingWeight = pageData.layoutVariation?.alternateHeadingOrder ? 'font-black' : 'font-bold';
                
                let componentsContent = (
                  <div className="space-y-8">
                    {pageData.components.map((component: any) => renderComponent(component))}
                  </div>
                );
                
                if (pageData.layoutVariation?.extraDivWrappers) {
                  componentsContent = (
                    <div className="p-4 bg-slate-50 rounded-md border border-slate-100">
                      {componentsContent}
                    </div>
                  );
                }
                
                return (
                  <section className="mb-12">
                    <SectionElement className={`${HeadingSize} ${HeadingWeight} text-slate-900 mb-6 flex items-center`}>
                      <div className="w-1 h-8 bg-red-600 mr-4"></div>
                      Additional Resources
                    </SectionElement>
                    {componentsContent}
                  </section>
                );
              })()}
              
              {/* Fictional Comments/Feedback Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  What Others Are Saying
                </h2>
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <div className="space-y-8">
                    {comments.map((comment: string, index: number) => {
                      const username = generateRandomUsername(index, slug);
                      const avatarUrl = generateRandomAvatar(username + slug + index);
                      const randomDays = Math.floor(Math.random() * 7) + 1;
                      
                      return (
                        <div key={index} className="flex items-start">
                          <div className="w-10 h-10 mr-4 flex-shrink-0">
                            <img 
                              src={avatarUrl} 
                              alt={`${username}'s avatar`} 
                              className="w-full h-full rounded-full border-2 border-slate-200 object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="font-bold text-slate-900 mr-2">{username}</span>
                              <span className="text-sm text-slate-400">{randomDays} days ago</span>
                            </div>
                            <p className="text-slate-700 mb-3 leading-relaxed">{comment}</p>
                            <div className="flex items-center text-sm text-slate-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Verified User
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
            
            {/* Right Column (35%) */}
            <div className="lg:col-span-4">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 text-slate-400 p-8 rounded-md mb-8">
                <h3 className="text-2xl font-black mb-4 text-shadow">Try BillRipper Today</h3>
                <p className="mb-6 text-lg font-medium opacity-95">
                  Experience the power of BillRipper and solve your development problems in minutes.
                </p>
                <button className="bg-white text-red-600 font-bold py-3 px-6 rounded-md hover:bg-slate-100 transition-colors">
                  Get Started
                </button>
              </div>
              
              {/* Features List */}
              <div className="bg-white border border-slate-200 p-6 rounded-md mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">Fast and reliable</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">Easy to use</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">Cost-effective</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">Secure</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">24/7 support</span>
                  </li>
                </ul>
              </div>
              
              {/* Related Keywords */}
              <div className="bg-white border border-slate-200 p-6 rounded-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Topics</h3>
                <div className="space-y-3">
                  {recommendations.map((rec: any) => (
                    <a
                      key={rec.slug}
                      href={`/rip/${rec.slug}`}
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h4 className="font-medium text-slate-900">{rec.title.replace('How to ', '')}</h4>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{rec.problem_description.substring(0, 80)}...</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-200 mt-12">
        <p className="text-slate-500">
          Support: <a href="mailto:457239850@qq.com" className="text-blue-600 hover:underline">457239850@qq.com</a>
        </p>
      </footer>
    </div>
  );
}

// 导出 Metadata 生成函数
export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const keyword = keywordsData.find((k: any) => k.slug === slug);
  
  if (!keyword) {
    return {
      title: 'BillRipper - Developer Tool',
      description: 'BillRipper helps developers solve common problems quickly and efficiently.',
    };
  }
  
  // 生成动态图片占位符 URL
  const ogImageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(keyword.title.replace('How to ', ''))}&image_size=landscape_16_9`;
  
  return {
    title: keyword.title.replace('How to ', '') + ' | BillRipper',
    description: generateRandomDescription(keyword),
    keywords: [keyword.title.replace('How to ', ''), 'BillRipper', 'development tool'],
    openGraph: {
      title: keyword.title.replace('How to ', '') + ' | BillRipper',
      description: generateRandomDescription(keyword),
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: keyword.title.replace('How to ', ''),
        },
      ],
    },
  };
}
