import type * as rdf from 'https://esm.sh/gh/rdfjs/types@v2.0.1/index.d.ts';

type Binding = {
  type : string;
  value: rdf.Term;
};

type Head = {
  vars: string[];
};

type Results = {
  bindings: Binding[];
};

type SparqlResults = {
  head   : Head;
  results: Results;
};

export type { SparqlResults, Binding, rdf };
