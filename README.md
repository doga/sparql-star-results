<p align="left">
<a href="https://w3c.github.io/sparql-concepts/spec/" target="_blank" rel="noreferrer"><img src="https://github.com/doga/doga/raw/main/logos/sparql.svg" height="85" alt="SPARQL logo" /></a>
</p>

# SPARQL-Star query result parser

A parser for the [SPARQL-Star query results format](https://rdf4j.org/documentation/programming/rdfstar/#extended-sparql-json-format). This format is supported by [GraphDB](https://graphdb.ontotext.com/).

## Usage example

<details data-mdrb>
<summary>Parse a SPARQL-Star query result.</summary>

<pre>
description = '''
Convert a SPARQL-Star query result into an RDF dataset.
'''
</pre>
</details>

```javascript
import { jsonToDataset } from 'https://esm.sh/gh/doga/sparql-star-results@1.0.0/mod.mjs';

const
queryResult = {
  "head" : {
    "vars" : [ "a", "b", "c" ]
  },
  "results" : {
    "bindings": [
      { "a" : {
          "type" : "triple",
          "value" : {
            "subject" : {
              "type" : "uri",
              "value" : "http://example.org/bob"
            },
            "predicate" : {
              "type" : "uri",
              "value" : "http://xmlns.com/foaf/0.1/age"
            },
            "object" : {
              "datatype" : "http://www.w3.org/2001/XMLSchema#integer",
              "type" : "literal",
              "value" : "23"
            }
          }
        },
        "b": {
          "type": "uri",
          "value": "http://example.org/certainty"
        },
        "c" : {
          "datatype" : "http://www.w3.org/2001/XMLSchema#decimal",
          "type" : "literal",
          "value" : "0.9"
        }
      }
    ]
  }
},
dataset = jsonToDataset(queryResult);

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

### Running the usage example

Run the example above by typing this in your terminal (requires [Deno](https://deno.com/) 2+):

```shell
deno run --allow-net --allow-run --allow-env --allow-read jsr:@andrewbrey/mdrb@3.0.4 --dax=false --mode=isolated 'https://raw.githubusercontent.com/doga/sparql-star-results/refs/heads/main/README.md'
```

∎
