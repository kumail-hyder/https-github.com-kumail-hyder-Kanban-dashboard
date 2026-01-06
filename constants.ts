import { Column, User } from "./types";

export const USERS: Record<string, User> = {
  u1: { id: "u1", name: "User A", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0fCCF_aHpMMnprxffgUg4zYRxrrUcQ7NgwZctbYHn7oVLyvDTinzBp2ShE5vLMfI5_80QcLBJJ0jYQFoMeZ8mPsW-two6iUo9CGNup_z2NZpv22Ah7sZ7k682DFcT-T8o3fQ7r7MH2H8ComFeI7kPqjyXQpahhn5QpZTLwgFqOxcM1vgSVVJEfGTxiSmJrFmACCzUZmvT_razEnwZ4ESYgkUS2U0L_oOTVr178VZv4J2HCf9F94W_0trZPUMcsecSKg-XfKp-whLu" },
  u2: { id: "u2", name: "User B", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8RLHBM-iUKuKg0NCb8HQ-ZL5dg1Yll_OP-FRZQ0plXj15cuIdrBhbHzDzEvd-JEREBik2NoxjhIutioeYe7bCooVwGxowJFXgmp1wPVHI8c9NLHacLT-p6QMGj_0M-ShWJ0ItH_qzfiuPrgxbGkqjDDfp1SFAQTDNL8I0eWsYPFGgQ-PELWe3EHuEOKVRow3zQkXbFXP9HGHBzCPWIUSGRe14dBghyconLGjkQ5xdQFEfpy9Q46ssixj_XAK0LOqctKWNKR70iH3p" },
  u3: { id: "u3", name: "User C", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiv-lU8ZwI3MhcYgplxKmCKFuMtvhhzE9G-vOUqCsH_C2-oBUWZzAD153BXsQRBrX-5Sd59s3U7Ke6upSVfuRTgGK2zMYqAlVpIjOwNt8IcNFB6j3rfSB3c6emWahZAy6ZjKQTi8BuIwXmro04GbLtHBomj5c_LpsJPOT4J6snqBLjmMt60gdDbs-XvxnqaPv1Bb_mvJPN17fjAsNL8OLufMOOtsY_bnKcSg5zWejvTRRd4EhGGfziiGeMQ73xtTnBaIMHmqxsM50a" },
  u4: { id: "u4", name: "User D", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX6rFVf89CKpdaWWvxOng5fPPkaLlJBiDqqq1GaLy-vh8A2Y2hbNOIQ3KtqowoDVfWJM_id3ZQdmtki8mwnPXuSXdhXAARFkiYfOlFrXYtWby6j2n3kejPYWSH0S6FSGT_StWCLSj6VQCpKC8eV3_WV-FsVXx93hiHtlc9bnhAnvTgVGFRsWwxfkKj6WokulHCvcabHwBlWumNUN09nidvBontbVfPXdnnFxpc8y4IMAgTCnN64-tO04fcx9ENojXNzmuMT6lIjrcH" },
  u5: { id: "u5", name: "User E", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB2t1-yeRwW5gyXfevCCoKXBt7zViPo0te_jb7IhDSzELYuRTzu0GaktzsYb9Veo3DSpEBMM6nWl5BpWqwC7fAQHhF8B_Og-Qt1zJSDH551Whk4W0KdmvbLFheGtCxFPuODeIm3GmHeV5E3qcNH3ybIkXoJfLGREyShoClMlS0ux63LGNni2uCK6_KxtHzZfZjU32hma4YxfZcnSXtgxiuvf1cgNNGsGmPPQY5ZwPy3JU7u812d-2hhM_mJ5JLvwd0lxT5erOcgSHi" },
  u6: { id: "u6", name: "User F", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGsCa440XLQH9yi9DtePyUzU9YZN1P15lyFkMVxltIrhVtUVM1P_MRLnQNk02a7C7Z_RvO1MI6V3gqrgWrRa2WIZKGGLZ-cmrM-Trao45giWWM58g4yy48IIQBIE5Avnhp8WDibngM5fVc4sdSi20YifvIJcQ_t2VuApgFja6y3R3rDVnDfqmbJkZhsXkSsONAMb-8y4u0xhnMIinyP3Lu1ScEpp7Zg4ajGc91hg4eJAxn7C1c1Io4jYWmzsCtBcF0OM8KHmD_6NRC" }
};

export const INITIAL_COLUMNS: Column[] = [
  {
    id: "col-1",
    title: "Research",
    colorClass: "bg-blue-400",
    taskCount: 3,
    tasks: [
      {
        id: "t1",
        title: "Conduct User Interviews (n=15)",
        columnId: "col-1",
        tags: [{ label: "Research", color: "blue" }, { label: "High", color: "red" }],
        assignees: [USERS.u1],
        dueDate: "Today",
        attachments: 2,
        isHighPriority: true,
        priority: "High",
        storyPoints: 5,
      },
      {
        id: "t2",
        title: "Analyze App Store Reviews",
        columnId: "col-1",
        tags: [{ label: "Analysis", color: "blue" }],
        assignees: [USERS.u6, USERS.u3],
        dueDate: "Oct 24",
        commentsCount: 5,
        priority: "Medium",
        storyPoints: 3,
      },
      {
        id: "t3",
        title: "Competitor Benchmarking",
        columnId: "col-1",
        tags: [],
        assignees: [],
        priority: "Low",
        storyPoints: 2,
      }
    ]
  },
  {
    id: "col-2",
    title: "Definition",
    colorClass: "bg-orange-400",
    taskCount: 3,
    tasks: [
      {
        id: "t4",
        title: "Create User Personas",
        columnId: "col-2",
        tags: [{ label: "Strategy", color: "orange" }],
        assignees: [USERS.u2],
        dueDate: "Oct 28",
        coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk35ughIVE-sBbxepcskLsUU-5hi5pLF-gDLxUM9Xizvio1kwQhaUZm8W6R3LguljuXbbiShY2ISHvGMrgV0LshPzaCvSJIPLKe6YqTyAj3mEIYVR5yylv2omhs1FutYNAkz5XGvxlrqbzb1Qha4JlQTaMBEPE24Phjc91cXA9O4DY8GKFhWX9FWV2DnXDcMYZDDKo72IAR5D5p28dXfbdVavEJqIRKWHTuyxV9p0sF4-dyq0a8jMe75YOxQkbX0oN4cNc7wvkh88R",
        description: "Based on the user interviews conducted in the Research phase, we need to synthesize the data into 3 distinct user personas.",
        subtasks: [
           { id: "st1", title: "Analyze interview transcripts", isCompleted: true },
           { id: "st2", title: "Draft persona templates", isCompleted: true },
           { id: "st3", title: "Review with stakeholders", isCompleted: false },
        ],
        priority: "High",
        storyPoints: 8,
      },
      {
        id: "t5",
        title: "Sketch Wireframes",
        columnId: "col-2",
        tags: [{ label: "Wireframing", color: "indigo" }],
        assignees: [USERS.u4],
        dueDate: "Nov 02",
        priority: "Medium",
        storyPoints: 5,
      }
    ]
  },
  {
    id: "col-3",
    title: "Design",
    colorClass: "bg-purple-400",
    taskCount: 0,
    tasks: [] 
  },
  {
    id: "col-4",
    title: "Testing",
    colorClass: "bg-yellow-400",
    taskCount: 0,
    tasks: []
  },
  {
    id: "col-5",
    title: "Ready for Dev",
    colorClass: "bg-emerald-400",
    taskCount: 1,
    tasks: [
      {
        id: "t6",
        title: "Handover Assets - Biometrics",
        columnId: "col-5",
        tags: [{ label: "Handoff", color: "gray" }],
        assignees: [USERS.u5],
        dueDate: "Nov 20",
        attachments: 1, // Represents "Zip"
        priority: "Low",
        storyPoints: 1,
      }
    ]
  }
];