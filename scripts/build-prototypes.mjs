import { readFile, writeFile } from 'node:fs/promises';
import { transform } from 'esbuild';

const builds = [
  {
    locale: 'en',
    output: 'astroguide-en.min.js',
    sources: ['production-runtime.jsx', 'locale-config-en.jsx', 'components-en.jsx', 'screens-a-en.jsx', 'screens-b-en.jsx', 'screens-c-en.jsx', 'app.jsx'],
  },
  {
    locale: 'es',
    output: 'astroguide-es.min.js',
    sources: ['production-runtime.jsx', 'locale-config-es.jsx', 'components-es.jsx', 'screens-a-es.jsx', 'screens-b-es.jsx', 'screens-c-es.jsx', 'app.jsx'],
  },
  {
    locale: 'ru',
    output: 'astroguide-ru.min.js',
    sources: ['production-runtime.jsx', 'locale-config-ru.jsx', 'components.jsx', 'screens-a.jsx', 'screens-b.jsx', 'screens-c.jsx', 'app.jsx'],
  },
];

for (const build of builds) {
  const parts = await Promise.all(build.sources.map((source) => readFile(source, 'utf8')));
  // The original browser-global sources intentionally repeat React hook
  // destructuring in several files. `var` preserves that script behavior while
  // allowing the ordered sources to be compiled as one production artifact.
  const source = parts.join('\n').replace(/^const (\{[^\n]+\} = React;)$/gm, 'var $1');
  const result = await transform(source, {
    loader: 'jsx',
    minify: true,
    legalComments: 'none',
    target: ['es2020'],
  });
  await writeFile(build.output, result.code);
  console.log(`${build.locale}: ${build.output} (${Buffer.byteLength(result.code)} bytes)`);
}
