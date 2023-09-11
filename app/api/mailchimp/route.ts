type BlockFormFields = {
    email: string,
    firstName: string,
    lastName: string,
    office: string,
}

function getRequestParams(
  formData: BlockFormFields,
) {
  // get env variables
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const LIST_ID = process.env.MAILCHIMP_LIST_ID
  // mailchimp datacenter - mailchimp api keys always look like this:
  // fe4f064432e4684878063s83121e4971-us6
  // We need the us6 part
  const DATACENTER = API_KEY?.split('-')[1]

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${formData.email}`

  // Add aditional params here. See full list of available params:
  // https://mailchimp.com/developer/reference/lists/list-members/
  const data = {
    email_address: formData.email,
    merge_fields: {
      FNAME: formData.firstName,
      LNAME: formData.lastName,
    },
    tags: [formData.office]
  }

  // Api key needs to be encoded in base 64 format
  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString('base64')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64ApiKey}`
  }

  return {
    url,
    data,
    headers
  }
}

export async function POST(req: Request) {

  const formData = await req.json();

  if (!formData.email || !formData.email.length || !formData.firstName || !formData.firstName.length || !formData.lastName || !formData.lastName.length || !formData.office || !formData.office.length) {
    return new Response(JSON.stringify({error: 'You must provide full information'}),{status: 400});
  }

  try {
    const { url, data, headers } = getRequestParams(
      formData,
    )

    await fetch(url, {
      body: JSON.stringify(data),
      headers: headers,
      method: 'PUT'
    })
  } catch (error) {
    return new Response(JSON.stringify({error: error}),{status: 500});
  }

  return new Response(JSON.stringify({error: null}),{status: 200});
}