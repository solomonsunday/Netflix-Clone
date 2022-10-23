/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://engaging-dassie-90.hasura.app/v1/graphql",
    {
      method: "POST",
      headers: {
        "x-hasura-admin-secret":
          "0oDIKnuP7PlqXpCs2crsCcSuoshatflKT0b3nbz6p9zW831aBKZvDc72VBhahKS8",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}

function fetchMyQuery() {
  const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
        publicAddress
      }
    }
  `;
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error({ errors });
  }

  // do something great with this precious data
  console.log({ data });
}

//   startFetchMyQuery();
