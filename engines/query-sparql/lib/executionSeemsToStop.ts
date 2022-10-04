import { Store } from 'n3'; // eslint-disable-line import/no-extraneous-dependencies
import { QueryEngine } from './QueryEngine';

async function run(): Promise<void> {
  const engine = new QueryEngine();
  const results = await engine.queryBindings(
    `select (?p as ?q) (count(distinct ?s) as ?aantal) {
  ?s ?p ?o.
}
group by ?p
order by desc(?aantal)
`,
    { sources: [ new Store() ]},
  );
  results.on('error', console.error); // eslint-disable-line no-console
  // eslint-disable-next-line no-console
  console.log('Before reading from response stream. More log statements should follow.');
  await new Promise(resolve => results.on('data', resolve));
}

run()
  .catch(console.error) // eslint-disable-line no-console
  .finally(() => console.log('The promise settled, everything is fine')); // eslint-disable-line no-console

process.on('uncaughtException', console.error); // eslint-disable-line no-console
process.on('unhandledRejection', console.error); // eslint-disable-line no-console
