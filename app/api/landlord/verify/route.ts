import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { ownerName, email, address } = await request.json()

    if (!ownerName && !email) {
      return NextResponse.json({ message: "Owner name or email is required" }, { status: 400 })
    }

    const verificationResults = await Promise.allSettled([
      // People Data Labs for professional information
      verifyWithPeopleDataLabs(ownerName, email),
      // Hunter.io for email verification
      verifyEmailWithHunter(email),
      // Global Company Data for business verification
      verifyWithGlobalCompanyData(ownerName),
    ])

    const results: any = {
      trustScore: 0,
      verifications: [],
      warnings: [],
      details: {},
    }

    verificationResults.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        const data = result.value
        results.verifications.push(data)
        results.trustScore += data.score || 0
        if (data.details) {
          Object.assign(results.details, data.details)
        }
        if (data.warnings) {
          results.warnings.push(...data.warnings)
        }
      }
    })

    // Calculate average trust score
    results.trustScore = Math.min(100, Math.round(results.trustScore / verificationResults.length))

    return NextResponse.json(results)
  } catch (error) {
    console.error("Landlord verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

async function verifyWithPeopleDataLabs(name?: string, email?: string) {
  if (!process.env.PEOPLE_DATA_LABS || (!name && !email)) return null

  try {
    const params = new URLSearchParams()
    if (name) params.append("name", name)
    if (email) params.append("email", email)

    const response = await fetch(`https://api.peopledatalabs.com/v5/person/enrich?${params}`, {
      headers: {
        "X-Api-Key": process.env.PEOPLE_DATA_LABS,
      },
    })

    if (!response.ok) return null

    const data = await response.json()

    return {
      source: "peopledatalabs",
      score: data.likelihood ? data.likelihood * 100 : 50,
      details: {
        fullName: data.full_name,
        jobTitle: data.job_title,
        company: data.job_company_name,
        industry: data.job_company_industry,
        location: data.location_name,
        linkedinUrl: data.linkedin_url,
        experience: data.experience?.length || 0,
      },
      warnings: data.likelihood < 0.5 ? ["Low confidence match"] : [],
    }
  } catch (error) {
    console.error("People Data Labs error:", error)
    return null
  }
}

async function verifyEmailWithHunter(email?: string) {
  if (!process.env.HUNTER_IO_API_KEY || !email) return null

  try {
    const response = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_IO_API_KEY}`,
    )

    if (!response.ok) return null

    const data = await response.json()

    const scoreMap: { [key: string]: number } = {
      deliverable: 90,
      risky: 60,
      undeliverable: 10,
      unknown: 40,
    }

    return {
      source: "hunter",
      score: scoreMap[data.data?.result] || 40,
      details: {
        emailStatus: data.data?.result,
        emailScore: data.data?.score,
        regexp: data.data?.regexp,
        gibberish: data.data?.gibberish,
        disposable: data.data?.disposable,
        webmail: data.data?.webmail,
        mxRecords: data.data?.mx_records,
        smtp: data.data?.smtp_server,
      },
      warnings: data.data?.result === "risky" ? ["Email marked as risky"] : [],
    }
  } catch (error) {
    console.error("Hunter.io error:", error)
    return null
  }
}

async function verifyWithGlobalCompanyData(ownerName?: string) {
  if (!process.env.GLOBAL_COMPANY_DATA || !ownerName) return null

  try {
    // This would depend on the specific Global Company Data API structure
    // Placeholder implementation
    const response = await fetch(`https://api.globalcompanydata.com/search?name=${encodeURIComponent(ownerName)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GLOBAL_COMPANY_DATA}`,
      },
    })

    if (!response.ok) return null

    const data = await response.json()

    return {
      source: "globalcompanydata",
      score: data.companies?.length > 0 ? 80 : 30,
      details: {
        companies: data.companies?.slice(0, 3) || [],
        businessCount: data.companies?.length || 0,
      },
      warnings: data.companies?.length === 0 ? ["No business records found"] : [],
    }
  } catch (error) {
    console.error("Global Company Data error:", error)
    return null
  }
}
