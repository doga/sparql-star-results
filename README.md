<p align="left">
<a href="https://w3c.github.io/sparql-concepts/spec/" target="_blank" rel="noreferrer"><img src="https://github.com/doga/doga/raw/main/logos/sparql.svg" height="85" alt="SPARQL logo" /></a>
</p>

# SPARQL-Star query results handler

A parser and serialiser for the [SPARQL-Star query results format](https://rdf4j.org/documentation/programming/rdfstar/#extended-sparql-json-format). This format is supported by [GraphDB](https://graphdb.ontotext.com/).

This library converts a SPARQL query result into an RDF [DatasetCore](https://rdf.js.org/dataset-spec/#datasetcore-interface) object and back. Note that this conversion only works for queries that return subject+predicate+object triples. Currently there are only two SPARQL query forms that produce this type of result:

- [CONSTRUCT](https://www.w3.org/TR/sparql12-query/#construct),
- [DESCRIBE](https://www.w3.org/TR/sparql12-query/#describe).

## Usage examples

<details data-mdrb>
<summary>Parse a SPARQL-Star query result.</summary>

<pre>
description = '''
Convert query result to an RDF dataset.
'''
</pre>
</details>

```javascript
import { toDataset } from 'https://esm.sh/gh/doga/sparql-star-results@2.0.1/mod.mjs';

const
queryResult = {
  "head" : {
    "vars" : [ "subject", "predicate", "object" ]
  },
  "results" : {
    "bindings": [
      { "subject" : {
          "type" : "triple",
          "value" : {
            "subject" : {
              "type" : "uri", "value" : "http://example.org/bob"
            },
            "predicate" : {
              "type" : "uri", "value" : "http://xmlns.com/foaf/0.1/age"
            },
            "object" : {
              "type" : "literal", "value" : "23", "datatype" : "http://www.w3.org/2001/XMLSchema#integer"
            }
          }
        },
        "predicate": {
          "type": "uri", "value": "http://example.org/certainty"
        },
        "object" : {
          "type" : "literal", "value" : "0.9", "datatype" : "http://www.w3.org/2001/XMLSchema#decimal"
        }
      }
    ]
  }
},

dataset = toDataset(queryResult);

for (const quad of dataset) {
  console.group('Quad:');
  if(quad.subject.termType === 'Quad') {
    console.group('Subject quad:');
    console.info(`Subject:   ${quad.subject.subject.value}`)
    console.info(`Predicate: ${quad.subject.predicate.value}`)
    console.info(`Object:    ${quad.subject.object.value}`)
    console.groupEnd();
  } else {
    console.info(`Subject:   ${quad.subject.value}`)
  }
  console.info(`Predicate: ${quad.predicate.value}`)
  console.info(`Object:    ${quad.object.value}`)
  console.groupEnd();
}
```

Sample output for the code above:

```text
Quad:
    Subject quad:
        Subject:   http://example.org/bob
        Predicate: http://xmlns.com/foaf/0.1/age
        Object:    23
    Predicate: http://example.org/certainty
    Object:    0.9
```

<details data-mdrb>
<summary>RDF dataset to SPARQL-Star query result.</summary>

<pre>
description = '''
Convert an RDF dataset to a query result.
'''
</pre>
</details>

```javascript
import { fromDataset } from 'https://esm.sh/gh/doga/sparql-star-results@2.0.1/mod.mjs';

import rdf from 'https://esm.sh/gh/rdfjs/dataset@v2.0.2';
import t from 'https://esm.sh/gh/rdfjs/data-model@v2.1.0';

// create the dataset
const
queryResultDataset = rdf.dataset(),
subject = t.quad(
  t.namedNode('http://example.org/bob'),
  t.namedNode('http://xmlns.com/foaf/0.1/age'),
  t.namedNode('23', t.namedNode('http://www.w3.org/2001/XMLSchema#integer'))
),
predicate = t.namedNode('http://example.org/certainty'),
object = t.literal('0.9', t.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));

queryResultDataset.add(t.quad(subject, predicate, object));


// produce the SPARQL-Star query result
const queryResult = fromDataset(queryResultDataset);
console.info(JSON.stringify(queryResult, null, 2));
```

Sample output for the code above:

```text
{
  "head": {
    "vars": [
      "subject",
      "predicate",
      "object"
    ]
  },
  "results": {
    "bindings": [
      {
        "subject": {
          "type": "triple",
          "value": {
            "subject": {
              "type": "uri",
              "value": "http://example.org/bob"
            },
            "predicate": {
              "type": "uri",
              "value": "http://xmlns.com/foaf/0.1/age"
            },
            "object": {
              "type": "uri",
              "value": "23"
            }
          }
        },
        "predicate": {
          "type": "uri",
          "value": "http://example.org/certainty"
        },
        "object": {
          "type": "literal",
          "value": "0.9",
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#decimal"
          }
        }
      }
    ]
  }
}
```

### Running the usage examples

Run the examples above by typing this in your terminal (requires [Deno](https://deno.com/) 2+):

```shell
deno run --allow-net --allow-run --allow-env --allow-read jsr:@andrewbrey/mdrb@3.0.4 --dax=false --mode=isolated 'https://raw.githubusercontent.com/doga/sparql-star-results/refs/heads/main/README.md'
```

∎
