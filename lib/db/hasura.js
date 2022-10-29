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
        // "x-hasura-admin-secret":
        //   "0oDIKnuP7PlqXpCs2crsCcSuoshatflKT0b3nbz6p9zW831aBKZvDc72VBhahKS8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNvbG9tb24iLCJpYXQiOjE2NjcwMzczNjYsImV4cCI6MTY2NzY0MjM5MiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6InNjaGlub3llcmVtIn19.UqIBTtwrfJvv0Cz6WRqkYLfN0OwSB-4zCYN8Imm5lBs",
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
