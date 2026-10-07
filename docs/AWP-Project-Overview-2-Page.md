# AWP Australian Workforce Platform
## Project Overview — What We Built and How It Works

**Current project scope:** HR, people, organisation structure, onboarding/offboarding, leave, time & attendance, rostering, employee self-service, compliance, performance, reporting, notifications, security and connected workforce operations.  
**Excluded from this overview:** Payroll and Organisation/Admin administration.

---

## PAGE 1 — PRODUCT, USER EXPERIENCE & CORE WORKFLOWS

### 1. What the project is

We built an Australian workforce management platform designed around one connected employee record. Instead of treating HR, managers and employees as separate systems, the platform links the employee's identity, employment information, organisation placement, managers, onboarding, leave, documents, certifications, performance and day-to-day work.

The core idea is:

**Employee record → people structure → work/leave → HR lifecycle → employee self-service → reporting**

This gives HR a people command centre, managers an operational workspace, and employees a self-service workspace while keeping permissions separated between them.

### 2. The main experiences we built

| Area | What we delivered |
|---|---|
| HR Dashboard | Workforce KPIs, onboarding/offboarding, compliance, tasks, probation, leave and activity summaries |
| Employees | Directory, search/filtering, employee creation, CSV import, employee profile and lifecycle history |
| Organisation Structure | Departments/sub-departments, teams, locations, positions, department heads, managers and people placement |
| Roles & Access | Custom roles, permissions and scopes such as organisation, department, team, location, direct reports and self |
| Onboarding | Pipeline, templates, checklist tasks and a nine-step onboarding journey |
| Offboarding | Exit initiation, termination details, checklist, tasks, final-pay hand-off and withdrawal |
| Leave | Leave requests, approvals, policies, entitlements, balances, ledger movements, calendars and accrual-related workflows |
| Time & Attendance | Clocking, attendance evidence, breaks, rounding, exceptions and timesheet flow |
| Rostering | Shifts, publishing, employee confirmation, availability, open shifts and swaps |
| Compliance | Employee documents, document versions, policies, acknowledgements and certification tracking |
| Performance | Review creation, assignment, competencies, ratings and review status workflow |
| Reports | HR reporting plus reusable non-payroll reporting, filters, grouping, sorting, exports and scheduled runs |
| My Workspace | Employee self-service for roster, timesheets, leave, payslips/expenses visibility, records, policies and security |
| Notifications | In-app notifications, preferences and workforce activity messaging |
| Security | Role/scope checks, protected sensitive information, audited changes and session/access controls |

### 3. Employee lifecycle we connected

We designed the project around a practical end-to-end lifecycle:

\`\`\`
CREATE / IMPORT EMPLOYEE
          ↓
ORGANISATION PLACEMENT
(department • team • location • position • manager)
          ↓
ONBOARDING
(personal • tax • super • banking • contract • documents
 • policies • certifications • induction)
          ↓
ACTIVE EMPLOYEE
          ↓
DAY-TO-DAY WORK
(roster • clock • attendance • timesheet • leave)
          ↓
HR OPERATIONS
(documents • policies • certifications • performance)
          ↓
REPORTING / SELF-SERVICE
          ↓
OFFBOARDING
(exit details • checklist • access closure coordination)
          ↓
TERMINATED + HISTORY
\`\`\`

### 4. How the work is divided between users

**HR** owns people information, organisation structure, onboarding/offboarding, compliance, performance, leave administration and HR reporting.

**Manager** owns operational team work such as rosters, attendance review, timesheet approval, leave approval and permitted team actions.

**Employee** works through self-service: their own roster, clocking, timesheets, leave, documents, policies, reviews and personal records.

This separation is deliberate. Sharing the same employee data does not mean every role sees or edits the same information.

### 5. Organisation structure and access model

One of the important parts we built was separating organisational structure from access control:

- **Department:** where a person belongs.
- **Department Head:** the designated head of that department.
- **Manager:** reporting relationship.
- **Role:** what the user can do.
- **Permission Scope:** whose data the role applies to.

Departments can be nested to any depth. Manager loops are prevented. Employees can be moved between departments, teams and locations, and the relevant payroll employment placement was kept synchronised without changing unrelated team/position/manager information.

Custom roles can be created from permissions the creator is allowed to grant. HR is deliberately prevented from granting or modifying payroll-admin-level access.

### 6. Onboarding and offboarding

We kept employee creation, account invitation and onboarding checklist creation as separate actions so the lifecycle is explicit rather than hidden.

The onboarding wizard covers nine steps:

**Personal details → Tax → Super → Banking → Contract → Identity documents → Policies → Certifications → Induction**

Offboarding records the departure details, creates exit work, coordinates the payroll final-pay hand-off, and supports withdrawal of an open exit. HR closure and payroll closure are deliberately separate so an HR checklist does not become false proof that financial settlement has happened.

---

## PAGE 2 — TECHNICAL APPROACH, DATA FLOW & WHAT WE ACHIEVED

### 7. How we built the platform

The implementation was built as a role-aware, data-connected workforce platform rather than a collection of isolated screens.

The main approach was:

\`\`\`
USER ACTION
    ↓
ROLE + PERMISSION CHECK
    ↓
PAGE / FEATURE API
    ↓
VALIDATION + BUSINESS RULES
    ↓
SHARED DATABASE RECORDS
    ↓
AUDIT / NOTIFICATION / DOWNSTREAM UPDATE
    ↓
OTHER WORKSPACES REUSE THE RESULT
\`\`\`

For important workflows we tested both the front-end journey and the connected result, rather than only checking that a button visually worked.

### 8. Shared data model

The employee identity acts as the hub. Around it we connected records for:

**people → employment → departments/teams/locations → managers → onboarding/tasks → documents/versions → policies/acknowledgements → certifications → performance reviews → leave requests/ledger/balances → attendance/timesheets → roster records → notifications → workforce audit history**

This is why a change made in one appropriate HR screen can be reflected in another workspace without creating duplicate employee records.

### 9. Leave and time architecture

We separated **clock evidence**, **timesheets** and **pay/work results** instead of treating them as one record.

\`\`\`
ROSTER / SHIFT
     ↓
EMPLOYEE WORKS + CLOCKS
     ↓
ATTENDANCE EVIDENCE
     ↓
TIMESHEET
     ↓
MANAGER APPROVAL
     ↓
DOWNSTREAM WORK / REPORTING
\`\`\`

Leave follows a similar controlled path:

\`\`\`
LEAVE REQUEST
     ↓
POLICY + BALANCE + CONFLICT CHECKS
     ↓
MANAGER / HR DECISION
     ↓
LEAVE LEDGER MOVEMENT
     ↓
CALENDAR + EMPLOYEE VISIBILITY
     ↓
DOWNSTREAM PAYROLL INPUT
\`\`\`

The leave ledger is treated as movement history, not just a number that is overwritten.

### 10. Documents, compliance and evidence

Documents use versioned records and visibility controls. Policies create acknowledgement requirements tied to the specific published version. Certifications track status, issue/expiry information and verification.

That gives the platform separate answers to separate questions:

**What document is this? Which version was used? Who signed? Who acknowledged? Is a certification current?**

Important employee changes and administrative actions are also captured as workforce audit evidence.

### 11. Reporting and visibility

We implemented two related reporting experiences:

**HR Reporting** for focused HR workforce insights, including headcount/turnover, leave liability, attendance/punctuality, overtime and certification compliance.

**Reports Workspace** for broader non-payroll reporting with available filters, grouping, sorting, export formats, saved definitions, schedules and run history.

We also kept role boundaries in the reporting layer so HR reporting does not automatically expose payroll-sensitive information.

### 12. Security and reliability work we completed

A significant part of the project was not just adding features, but fixing the places where connected workflows could break.

We verified/fixed areas including:

- tenant-scoped access boundaries,
- role and permission scope enforcement,
- protected payroll-sensitive fields,
- audited sensitive-data reveal,
- audited mutations,
- manager scope and approval behaviour,
- employee lifecycle transitions,
- onboarding/offboarding state handling,
- leave approval and balance movement,
- organisation-structure synchronisation,
- safe custom-role management,
- session/access closure,
- idempotent critical operations,
- dashboard drill-down consistency,
- employee/HR data consistency,
- mobile/navigation issues,
- payroll warning deep-link behaviour,
- manager reassignment and leave rejection flows,
- published shift → employee confirmation,
- HR offboarding → termination candidate behaviour.

We also ran targeted smoke testing across HR, Manager and Employee journeys instead of relying only on isolated page checks.

### 13. What we have effectively achieved

The result is a connected workforce platform where:

\`\`\`
ONE EMPLOYEE RECORD
        ↓
ONE CONSISTENT PEOPLE CONTEXT
        ↓
MULTIPLE CONTROLLED WORKSPACES
        ↓
ROLE-SPECIFIC ACCESS
        ↓
CONNECTED WORKFLOWS
        ↓
AUDITABLE HISTORY
\`\`\`

The project now covers the major employee lifecycle from hiring/onboarding through day-to-day people operations and finally offboarding, while keeping HR, Manager and Employee responsibilities clearly separated.

### 14. Current maturity

The project is not just a visual prototype. We have built and tested real cross-feature behaviour, seeded realistic Southern Cross Group demo data, connected the major employee/workforce records, and documented the remaining limitations where a current workflow is simulated, incomplete or intentionally separated.

The most important design principle throughout the project has been:

**Make every employee action meaningful beyond the current screen — the data should move to the next correct workflow, remain within the correct permission boundary, and leave a usable history of what happened.**

---

**Project summary:** AWP is now a connected Australian workforce platform centred on the employee lifecycle, with HR, Manager and Employee experiences working from shared data and controlled permissions. Payroll and Organisation/Admin administration are intentionally outside this project overview.
