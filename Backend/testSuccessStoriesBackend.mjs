process.env.PORT = "5099";
process.env.JWT_SECRET = "uniques_jwt_secret_key_2026";
process.env.NODE_ENV = "test";

import jwt from "jsonwebtoken";
import app from "./index.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Token for coordinator (permitted for CRUD)
const coordinatorToken = jwt.sign(
  { id: "coord_test_123", role: "coordinator" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

// Token for common member (NOT permitted for CRUD)
const memberToken = jwt.sign(
  { id: "member_test_456", role: "member" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

const runTests = async () => {
  // Give server time to bind
  await new Promise((resolve) => setTimeout(resolve, 800));

  const baseUrl = "http://127.0.0.1:5000/api/success-stories";
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  const assertTest = (condition, description) => {
    totalTests++;
    if (condition) {
      console.log(`[PASS] Test ${totalTests}: ${description}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Test ${totalTests}: ${description}`);
      failedTests++;
    }
  };

  try {
    console.log("\n=======================================================");
    console.log("TEST SUITE: SUCCESS STORIES ROLE-BASED ACCESS & CRUD");
    console.log("=======================================================\n");

    // 1. PUBLIC READ ACCESS (Visitors & Common Users)
    console.log("--- 1. Testing Public Read Access (Common Users) ---");
    const getRes = await fetch(baseUrl);
    const getData = await getRes.json();
    assertTest(getRes.status === 200, "Public users can fetch success stories list (200 OK)");
    assertTest(getData.success === true && Array.isArray(getData.data), "Response contains data array");

    // 2. UNAUTHENTICATED USERS BLOCKED FROM MUTATIONS
    console.log("\n--- 2. Testing Unauthenticated Mutation Protection ---");
    const unauthPostRes = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Hacker Attempt" }),
    });
    assertTest(
      unauthPostRes.status === 401,
      "Unauthenticated users cannot create stories (401 Unauthorized)"
    );

    const unauthDeleteRes = await fetch(`${baseUrl}/any_id`, {
      method: "DELETE",
    });
    assertTest(
      unauthDeleteRes.status === 401,
      "Unauthenticated users cannot delete stories (401 Unauthorized)"
    );

    // 3. COMMON USERS / MEMBERS BLOCKED FROM MUTATIONS (403 FORBIDDEN)
    console.log("\n--- 3. Testing Role Authorization: Member Cannot Modify ---");
    const memberPostRes = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${memberToken}`,
        token: memberToken,
      },
      body: JSON.stringify({ name: "Student Unauthorized" }),
    });
    assertTest(
      memberPostRes.status === 403,
      "Common Member cannot create stories (403 Forbidden - Coordinator required)"
    );

    const memberDeleteRes = await fetch(`${baseUrl}/any_id`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${memberToken}`,
        token: memberToken,
      },
    });
    assertTest(
      memberDeleteRes.status === 403,
      "Common Member cannot delete stories (403 Forbidden - Coordinator required)"
    );

    // 4. COORDINATOR FULL CRUD OPERATIONS
    console.log("\n--- 4. Testing Coordinator Full CRUD Operations ---");

    // 4.1 CREATE
    const newStoryData = {
      name: "Tanya Aggarwal",
      role: "Cloud Architect",
      company: "Google Cloud",
      batch: "The Uniques 1.0",
      summary: "Excelling in cloud architecture and leading distributed systems.",
      timeline: [
        { year: 2021, achievements: ["Joined The Uniques Community"] },
        { year: 2024, achievements: ["Placed as Cloud Architect at Google"] },
      ],
      education: {
        institution: "Swami Vivekanand Institute of Engineering and Technology",
        degree: "B.Tech CSE",
        duration: "2021-2025",
      },
      skills: {
        languages: ["Go", "Python", "TypeScript"],
        technologies: ["Kubernetes", "GCP", "Terraform"],
        tools: ["Docker", "Git"],
      },
      isPublished: true,
    };

    const coordPostRes = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${coordinatorToken}`,
        token: coordinatorToken,
      },
      body: JSON.stringify(newStoryData),
    });

    const coordPostData = await coordPostRes.json();
    assertTest(coordPostRes.status === 201, "Coordinator can create a new story (201 Created)");
    assertTest(coordPostData.data?.name === "Tanya Aggarwal", "Created story has correct student name");

    const createdStoryId = coordPostData.data?.id;

    // 4.2 READ CREATED STORY VIA PUBLIC ENDPOINT
    const publicSingleRes = await fetch(`${baseUrl}/${createdStoryId}`);
    const publicSingleData = await publicSingleRes.json();
    assertTest(publicSingleRes.status === 200, "Newly created story is publicly readable");
    assertTest(
      publicSingleData.data?.company === "Google Cloud",
      "Created story matches submitted details"
    );

    // 4.3 UPDATE STORY AS COORDINATOR
    const coordUpdateRes = await fetch(`${baseUrl}/${createdStoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${coordinatorToken}`,
        token: coordinatorToken,
      },
      body: JSON.stringify({
        role: "Senior Staff Cloud Architect",
        company: "Google DeepMind",
      }),
    });
    const coordUpdateData = await coordUpdateRes.json();
    assertTest(coordUpdateRes.status === 200, "Coordinator can update existing story (200 OK)");
    assertTest(
      coordUpdateData.data?.role === "Senior Staff Cloud Architect",
      "Updated story has revised designation"
    );

    // 4.4 DELETE STORY AS COORDINATOR
    const coordDeleteRes = await fetch(`${baseUrl}/${createdStoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${coordinatorToken}`,
        token: coordinatorToken,
      },
    });
    assertTest(coordDeleteRes.status === 200, "Coordinator can delete story (200 OK)");

    // 4.5 VERIFY DELETION
    const verifyDeletedRes = await fetch(`${baseUrl}/${createdStoryId}`);
    assertTest(verifyDeletedRes.status === 404, "Deleted story is no longer found (404 Not Found)");

    console.log("\n=======================================================");
    console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Tests Passed`);
    console.log("=======================================================\n");

    if (failedTests > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  }
};

runTests();
