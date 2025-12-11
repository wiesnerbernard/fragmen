export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>Getting Started</h2>
            <p>Fragmen is a utility library that copies code fragments directly into your project. No dependencies, no bloat - just pure TypeScript utilities you can own and customize.</p>
            
            <h2>Installation</h2>
            <p>Initialize Fragmen in your project:</p>
            <pre><code>npx fragmen init</code></pre>
            
            <h2>Commands</h2>
            
            <h3>List Utilities</h3>
            <p>View all available utilities:</p>
            <pre><code>npx fragmen list</code></pre>
            <p>Filter by category:</p>
            <pre><code>npx fragmen list promise</code></pre>
            
            <h3>Add Utilities</h3>
            <p>Add a single utility:</p>
            <pre><code>npx fragmen add promise/delay</code></pre>
            <p>Add multiple utilities at once:</p>
            <pre><code>npx fragmen add promise/delay string/capitalize array/chunk</code></pre>
            
            <h3>Show Utility</h3>
            <p>Preview a utility before adding it:</p>
            <pre><code>npx fragmen show promise/delay</code></pre>
            
            <h3>Browse</h3>
            <p>Interactive browser to explore and select utilities:</p>
            <pre><code>npx fragmen browse</code></pre>
            
            <h2>Categories</h2>
            <ul>
              <li><strong>array</strong> - Array manipulation utilities</li>
              <li><strong>boolean</strong> - Boolean helpers</li>
              <li><strong>date</strong> - Date and time utilities</li>
              <li><strong>function</strong> - Function utilities</li>
              <li><strong>json</strong> - JSON parsing and validation</li>
              <li><strong>number</strong> - Number formatting and manipulation</li>
              <li><strong>object</strong> - Object manipulation utilities</li>
              <li><strong>promise</strong> - Promise and async utilities</li>
              <li><strong>string</strong> - String manipulation and formatting</li>
              <li><strong>url</strong> - URL parsing and building</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
