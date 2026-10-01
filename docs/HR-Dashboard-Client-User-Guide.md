
# AWP Australian Workforce Platform
## HR Dashboard — Client User Guide

**Edition:** October 2026  
**Audience:** HR Administrators and clients presenting or using the HR workspace  
**Demo organisation used in examples:** Southern Cross Group  
**Scope:** Current HR implementation documented in the supplied HR Dashboard User Guide

---

# Contents at a Glance

This compact guide is designed to answer three questions on every HR page:

1. **What is this page for?**
2. **What can I see, filter, and do here?**
3. **What happens to the information after I use it?**

## Detailed Index

| Section | Page / Workspace | What it covers |
|---|---|---|
| 1 | HR Dashboard & lifecycle | Roles, menu, lifecycle, sign-in, overall workflow |
| 2 | Home Dashboard | KPI cards, workforce metrics, tasks, compliance, activity, search, notifications |
| 3 | Employees | Directory, filters, add employee, import, statuses and lifecycle |
| 4 | Employee Profile | Personal details, employment, history, notes, onboarding, documents, contracts, certifications, leave, audit and payroll boundary |
| 5 | Organisation Structure & Access | Departments, sub-departments, teams, locations, positions, people/managers, roles and access |
| 6 | Onboarding | Onboarding pipeline, templates, nine-step employee checklist, contracts, signatures, activation |
| 7 | Offboarding | Exit initiation, checklist, tasks, final-pay hand-off, withdrawal and closure |
| 8 | Leave Approvals & Settings | Requests, decisions, conflicts, leave types, policies, blackout periods, accruals, balances, calendars and payroll hand-off |
| 9 | Compliance | Employee documents, employee document view, policies, acknowledgements, certifications and reminders |
| 10 | Performance Reviews | Review list, creation, assignment, ratings, status changes, employee/manager visibility |
| 11 | HR Reports & Workforce Insights | HR reporting tabs, filters, reports workspace, exports, saved definitions and schedules |
| 12 | Connected Operations | How HR connects to managers, time, rosters, payroll and expenses without operating those admin areas |
| 13 | My Workspace | HR user's own employee view: roster, timesheets, leave, payslips, expenses and records |
| 14 | Where the Data Goes | Shared employee record, leave ledger, time/timesheet separation, documents, evidence, history and access scope |
| 15 | Permissions & Boundaries | Role differences and important HR/Admin/Manager/Employee boundaries |
| 16 | Current Limitations | Important current-build behaviour that should be understood before client use |
| 17 | Quick Workflow Maps | One-page workflow reference for common HR jobs |
| 18 | Glossary | Plain-language meanings of the key HR terms used in the system |

---

# 1. HR Dashboard & Employee Lifecycle

## 1.1 What the HR workspace is

The HR workspace is the people command centre for employee records, organisational structure and access, onboarding and offboarding, documents, policies, certifications, performance reviews, leave approvals/settings and HR reporting.

HR does **not** run payroll, manage the operational attendance workspace or administer the platform-wide settings area.

## 1.2 Who does what

| Role | Main responsibility |
|---|---|
| Super Admin | Platform-wide organisation and subscription administration |
| Organisation Admin | Full administration for one organisation, including settings, users, integrations and audit logs |
| HR Admin | Employee records, structure/access, onboarding/offboarding, HR compliance, performance, leave and HR reports |
| Payroll Admin | Payroll calculation, finalisation, pay details, bank/tax/super, payslips, super, PAYG, STP and payroll reports |
| Manager | Team rosters, attendance, timesheet approvals, leave approvals and permitted expense approvals |
| Employee | Self-service for own roster, clocking, timesheets, leave, payslips, expenses, documents, policies and profile |

A role is a bundle of permissions. A permission scope controls how much of the organisation those permissions cover, for example the whole organisation, a department, a team, direct reports or self.

## 1.3 HR menu

The normal HR menu contains:

**Overview:** Dashboard  
**My workspace:** My Dashboard, My Roster, My Timesheets, My Leave, My Pay, My Records  
**People:** Employees, Organisation Structure, Performance Reviews, Onboarding, Offboarding  
**Operations:** Leave Approvals, Leave Settings  
**Compliance:** Employee Documents, Policies, Certifications  
**Insights:** Reports

Pages belonging to Attendance, Exceptions, Rostering, Expenses, Payroll, Integrations and platform Settings are outside the standard HR Admin workspace.

## 1.4 The full employee lifecycle

~~~text
CREATE / IMPORT EMPLOYEE
          ↓
PLACE IN ORGANISATION
(department, team, location, position, manager)
          ↓
ONBOARD
(personal details → tax → super → banking → contract
 → identity → policies → certifications → induction)
          ↓
VERIFY / ACTIVATE
          ↓
DAY-TO-DAY EMPLOYEE
(rosters → clocking → timesheets → leave
 → documents → certifications → policies → reviews)
          ↓
APPROVED WORK + LEAVE
          ↓
PAYROLL HAND-OFF
(handled by Payroll Admin)
          ↓
OFFBOARD
(exit details → checklist → final-pay coordination)
          ↓
TERMINATED
(history retained)
~~~

### Important distinction

Adding an employee, starting an onboarding checklist and inviting a person to sign in are separate actions. The standard HR Admin role cannot send account invitations.

---

# 2. Home Dashboard

## 2.1 Purpose

The Home dashboard gives HR a quick view of workforce priorities and links into the pages where work is actually performed.

**Navigation:** Overview → Dashboard

## 2.2 Welcome band and launchpad

The welcome band shows organisation name, greeting, first name and date. It also shows headcount and open-task summary chips.

The six launch tiles navigate to:

- Add employee → Employees
- Start onboarding → Onboarding
- Upload document → Employee Documents
- Publish policy → Policies
- Add certification → Certifications
- Create report → HR report pack

These tiles are navigation shortcuts; they do not perform the final action themselves.

## 2.3 KPI cards

| Card | What it means | Main destination |
|---|---|---|
| Headcount | Current people excluding Invited and Terminated | Employees |
| Onboarding | Employees currently in Onboarding | Onboarding |
| Offboarding | Employees currently Terminating | Offboarding |
| Pending leave | Leave requests currently Pending | Leave Approvals with Pending selected |
| Expiring certifications | Certifications expiring today or within 60 days | Certifications |
| Open tasks | Open tasks that are not Completed or Cancelled | Onboarding |
| Probation reviews | Current-headcount employees whose probation end date is due/past | Employees |
| Policy acknowledgement | Percentage of acknowledgement assignments marked Acknowledged | Policies |

Read each headline number with its hint; the hint may refer to a different date range or population.

## 2.4 Workforce metrics

The dashboard has seven display tabs:

**Headcount** — 12-month headcount, starters and leavers.  
**Turnover** — monthly leavers/starters and turnover percentage.  
**Employment mix** — six-month workforce split by employment type.  
**Departments** — current headcount by department.  
**Locations** — current headcount by location.  
**Diversity** — current-headcount gender breakdown.  
**Tenure** — service bands: under 1 year, 1–2 years, 2–5 years and 5+ years.

The metric tabs change the visual display; they do not create saved filters for the other pages.

## 2.5 Lower dashboard widgets

The lower area shows:

- To do list
- Employee onboarding
- Compliance
- Probation reviews
- Upcoming starters
- Offboarding
- Celebrations
- Pending leave
- Recent activity

The Pending leave widget is the main dashboard drill-down with an applied status filter. Other widgets are summaries and may show only the first several records.

## 2.6 Search and notifications

### Global Search

Search starts after at least two characters. It searches permitted:

- Employees
- Documents
- Leave requests
- Shifts
- Policies
- Expenses

Payroll records are not part of the HR search.

### Notifications

The notification bell is your personal inbox for messages addressed to you. It is separate from the HR work queues.

Notification preferences control available in-app/email choices.

## 2.7 Dashboard flow

~~~text
Open Home
  ↓
Review KPI / widget
  ↓
Choose priority
  ↓
Open destination page
  ↓
Apply page filters / perform action
  ↓
Return to Home
  ↓
Review updated summary
~~~

**Data rule:** Viewing the dashboard does not approve leave, create tasks, send invitations or create a new HR record.

---

# 3. Employees

## 3.1 Employee Directory

**Navigation:** People → Employees

Use the directory to find, open and create employee records.

### Filters

| Filter | Purpose |
|---|---|
| Search | Find by name, email or job title |
| Department | Narrow by department |
| Status | Filter by employee lifecycle status |
| Location | Narrow by recorded location |
| Employment type | Filter by employment type |
| Pagination | Move through the result set |

### Actions

**Add employee** opens the employee creation form.  
**Import** starts the CSV import process.  
Selecting an employee opens the full employee profile.

## 3.2 Add an employee

Creating the employee record stores the person identity and employment information needed for the HR record.

Creation is not the same as:

- creating a sign-in account,
- sending an invitation, or
- starting an onboarding checklist.

Those steps happen separately.

## 3.3 Employee statuses

The lifecycle includes statuses such as:

**INVITED, ONBOARDING, ACTIVE, ON_LEAVE, TERMINATING, TERMINATED, SUSPENDED, INACTIVE, ARCHIVED.**

Lifecycle status is not the same thing as employment type.

A person can remain in the directory after termination because historical employee records are retained.

## 3.4 CSV import

The import flow is:

~~~text
Prepare file
   ↓
Upload
   ↓
Validate
   ↓
Preview / Dry Run
   ↓
Confirm
   ↓
Import result
~~~

The import process records the job, creates/updates people and employment records as supported, records status history and produces workforce audit evidence.

---

# 4. Employee Profile

## 4.1 Profile navigation

The employee record is the main HR hub. Its connected tabs include:

**Profile, Employment, Status history, Notes, Onboarding, Documents, Contracts, Certifications, Leave.**

The profile also exposes audit history where permitted.

## 4.2 Profile and personal details

HR can maintain employee identity and personal information such as legal/preferred name, date of birth, gender, mobile, personal email and address subject to permission.

Payroll-sensitive information is kept outside the normal HR profile.

### Important boundary

Tax, superannuation, bank account and pay-rate information are protected Payroll records. HR should use the Payroll workspace/process for those areas rather than treating the HR profile as a pay-data editor.

## 4.3 Employment and status history

The Employment area contains the employee's employment information and organisational placement.

Status history provides the record of lifecycle changes rather than simply showing today's status.

## 4.4 Notes

Employee notes let HR keep internal information associated with the employee.

Confidentiality depends on the permissions and visibility rules applied to the record.

## 4.5 Onboarding, documents and contracts

The profile brings together the person's onboarding progress, uploaded HR documents, contracts/agreements and certification records.

For contracts, supported types include:

- Permanent
- Fixed term
- Casual
- Contractor
- Variation

Contract status includes Draft, Sent, Signed, Declined, Expired and Superseded.

Signature evidence is linked to the relevant document version.

## 4.6 Leave balance summary

The employee profile can show leave balance information, but the modern leave checks use the leave ledger as the authoritative movement history. Treat a profile summary as a convenient view, not as a replacement for reviewing leave movements.

## 4.7 Audit and payroll boundary

HR can see employee-level HR history where the permission supports it.

Standard HR does not receive the Payroll Admin's full payroll workspace.

Sensitive numbers are protected/encrypted and reveal actions are audited.

## 4.8 Profile flow

~~~text
Employee record
   ↓
Personal / employment facts
   ↓
Organisation placement
   ↓
Onboarding + documents + certifications
   ↓
Leave + reviews + lifecycle history
   ↓
Other workspaces reuse the same employee identity
~~~

---

# 5. Organisation Structure & Access

## 5.1 What this page controls

**Navigation:** People → Organisation Structure

This page separates four different ideas:

**Department** = where the employee belongs.  
**Department Head** = one designated head for that department.  
**Manager** = reporting-line relationship.  
**Role** = what a user is allowed to do.  
**Permission scope** = whose data those abilities cover.

These concepts are related but are not interchangeable.

## 5.2 Departments and sub-departments

HR can create a hierarchy to any depth, for example:

~~~text
Finance
  ↓
Payroll
  ↓
Payroll Ops
~~~

A department may have one designated department head.

The parent selector prevents a department from being placed under one of its own descendants.

A department can only be deleted when it is empty.

## 5.3 Teams / Groups

HR can:

- create teams,
- edit or remove teams,
- assign employees to teams,
- manage team membership.

Teams are separate from the department hierarchy.

## 5.4 Locations

HR can create/edit/remove locations and assign employees to the appropriate location.

Changing structure from this page updates the employee's current organisational placement used elsewhere in HR and the payroll employment record for the department/location move.

## 5.5 Positions

Positions can be created and maintained as role/position records.

Position information can also connect with position-required certifications used by the roster/qualification side of the platform.

## 5.6 People & managers

The structure page supports:

- employee placement,
- primary manager assignment,
- secondary manager assignment,
- moving an employee,
- bulk moves,
- manager relationship changes.

Manager loops are prevented.

The primary manager is the approval relationship currently used for leave/timesheet approval. Secondary manager information is currently informational/display-only.

## 5.7 Roles & access

Custom roles are created from permissions already available to the person creating the role.

A role can be scoped to:

- Organisation
- Department
- Team
- Location
- Direct reports
- Self

Department scope includes sub-departments.

HR cannot grant or remove the Payroll Admin role itself. HR also cannot modify or deactivate a custom role if that role contains permissions HR does not hold.

Organisation Admin has the broader administrative authority.

## 5.8 Structure workflow

~~~text
Create department / team / location / position
                    ↓
Place employee
                    ↓
Assign primary / secondary manager
                    ↓
Create or assign appropriate role
                    ↓
Set permission scope
                    ↓
Employee's permitted views change
~~~

---

# 6. Onboarding

## 6.1 Onboarding area

**Navigation:** People → Onboarding

Onboarding has three related but separate ideas:

1. Employee record
2. Sign-in invitation
3. Onboarding checklist

HR manages the employee record and onboarding work. Standard HR does not send the account invitation.

## 6.2 Onboarding pipeline

The onboarding workspace is used to find starters, start checklist work and monitor progress.

Onboarding can use templates and ordered tasks.

## 6.3 Nine-step employee onboarding wizard

The current wizard covers:

1. Personal details
2. Tax
3. Super
4. Banking
5. Contract
6. Identity documents
7. Policies
8. Certifications
9. Induction

HR verifies the completed information before the employee reaches the active state.

## 6.4 Checklist vs invitation

Starting a checklist does not send an invitation.

An invitation creates a sign-in route; the checklist tracks onboarding work.

These are different records and can progress separately.

## 6.5 Contracts and signatures

Contract records support the employment relationship and can connect to documents and signatures.

A signed contract is associated with its document version, preserving evidence of which version was signed.

## 6.6 Onboarding flow

~~~text
Employee created
      ↓
Checklist started
      ↓
Employee receives access through separate invitation process
      ↓
Employee completes onboarding steps
      ↓
HR / responsible users verify information
      ↓
Employee becomes ACTIVE
~~~

## 6.7 Where onboarding information goes

Identity and employment details remain on the employee record.

Checklist and task progress remain in onboarding records.

Documents are stored as document records/version metadata with files outside PostgreSQL.

Policies create version-specific acknowledgement records.

Certifications can be reused for compliance and position qualification.

---

# 7. Offboarding

## 7.1 Starting an exit

**Navigation:** People → Offboarding or the employee profile

HR records:

- termination type,
- final working date,
- notice date,
- reason,
- notes,
- confirmation that the exit should start.

Starting the exit moves the employee to **TERMINATING** immediately. It is not a future scheduled status change.

## 7.2 Exit checklist and tasks

New exits receive a current-build set of manual exit tasks, including:

- notify manager and team,
- revoke system access,
- collect company equipment,
- complete exit interview,
- confirm final pay and leave payout with payroll.

The current build creates these tasks as manual checklist work; the task titles do not themselves send notices or revoke external systems.

## 7.3 Offboarding status tracks

Keep these status tracks separate:

| Track | Example states |
|---|---|
| Employee lifecycle | ACTIVE → TERMINATING → TERMINATED |
| Checklist/task progress | NOT_STARTED / IN_PROGRESS / COMPLETED / CANCELLED |
| Termination record | IN_PROGRESS / FINAL_PAY_PENDING / COMPLETED / CANCELLED |

## 7.4 Final-pay hand-off

The final financial calculation is handled by Payroll.

~~~text
HR starts exit
   ↓
Employee = TERMINATING
   ↓
HR coordinates exit work
   ↓
Payroll selects termination candidate
   ↓
Payroll calculates one-person final pay
   ↓
Payroll reviews and finalises
   ↓
Applicable leave payout / payroll records saved
   ↓
Employment moves toward TERMINATED
~~~

HR should not treat the manual "confirm final pay" task as proof that money has been paid.

## 7.5 Completing the exit

HR can complete the offboarding checklist when the required task work has been completed.

The lifecycle closure records status history and access-closure evidence.

The final-pay process is a separate Payroll-controlled closure path.

## 7.6 Withdrawing an exit

An open offboarding can be withdrawn when conditions allow.

Withdrawal:

- returns the employee to Active,
- cancels the open termination,
- cancels the open checklist and unfinished tasks,
- clears the employee termination date/reason,
- lifts the lifecycle access hold,
- retains the cancelled exit as history.

A pay run attached to a withdrawn termination is not silently repurposed.

---

# 8. Leave Approvals & Settings

## 8.1 Leave Approvals

**Navigation:** Operations → Leave Approvals

HR can review pending leave requests across the permitted employee population and make approval decisions.

### Typical information

- requester,
- leave type,
- number of days,
- start date,
- end date,
- request status,
- relevant conflict or balance warnings.

### Common decision flow

~~~text
Employee applies
      ↓
Policy / balance / conflict checks
      ↓
Pending request
      ↓
Manager or HR approval
      ↓
Approved / rejected
      ↓
Leave balance movement
      ↓
Payroll consumes approved leave later
~~~

## 8.2 Conflict warnings and overrides

The leave flow can flag issues such as policy, balance or scheduling conflicts.

Where the current build exposes an override path, use it deliberately and understand that the decision is recorded rather than silently ignored.

## 8.3 Leave Settings

**Navigation:** Operations → Leave Settings

The settings area covers visible leave configuration including:

- leave types,
- leave policies/entitlements,
- employee policy assignment,
- blackout periods,
- accrual runs,
- leave balance views and adjustments.

## 8.4 Balances and the ledger

Leave balances are not simply a manually edited number.

The system keeps a movement history in the leave ledger.

Conceptually:

~~~text
Opening / granted
     + accruals
     + adjustments
     - consumed leave
     = balance
~~~

Review the ledger when investigating a discrepancy.

## 8.5 Applying for leave

Employees can apply from My Leave.

HR can also submit requests on behalf where the permission allows.

Approved leave immediately creates the appropriate balance movement; payroll later receives the approved leave input.

Finalised payroll periods are not rewritten by ordinary HR leave changes.

## 8.6 Calendars

### Leave Calendar

Visible filtering includes:

- Month
- Location
- Team
- Department

The calendar distinguishes approved/pending leave and displays public holiday/blackout information where applicable.

### Holiday Calendar

The employee-facing holiday calendar supports year and region viewing.

HR can read the organisation holiday calendar but does not maintain organisation holidays.

## 8.7 Leave hand-off

~~~text
Leave request
  ↓
Policy / balance / conflict checks
  ↓
Approval
  ↓
Ledger movement
  ↓
Employee calendar / manager visibility
  ↓
Payroll input
  ↓
Payroll finalisation
~~~

---

# 9. Compliance: Documents, Policies & Certifications

## 9.1 Employee Documents

**Navigation:** Compliance → Employee Documents

The document workspace is used to manage employee-facing or HR-controlled documents.

Documents have visibility tiers such as:

- EMPLOYEE
- MANAGER
- HR_ONLY
- COMPANY

Document content/files are separate from the database metadata and version records.

## 9.2 Employee document view

Employees use their own My Records → Documents area to see documents they are allowed to see and to complete signing actions where supported.

Document signatures and document versions retain evidence.

## 9.3 Policies

Policies support:

- create,
- edit,
- create new version,
- publish,
- view acknowledgements,
- remind employees.

Acknowledgements are tied to the specific policy version.

## 9.4 Policy flow

~~~text
Draft policy
   ↓
Publish version
   ↓
Employees receive acknowledgement requirement
   ↓
Employee acknowledges
   ↓
Acknowledgement evidence retained
~~~

Publishing a new version does not make it the same acknowledgement record as an earlier version.

## 9.5 Certifications

Certification records can be found using the visible search/filter set:

- Search
- Status
- Employee
- Certification type
- Issuer / certificate number
- Issue / expiry
- Verified
- Days until expiry

Actions include:

- Add
- Edit
- Delete
- Verify
- Compliance check

Certification information can also feed position qualification checks.

## 9.6 Certification reminders

The HR area can surface upcoming and overdue certifications.

Reminder and exception evidence is retained in the certification-related records.

---

# 10. Performance Reviews

## 10.1 Performance Reviews list

**Navigation:** People → Performance Reviews

The current review list supports filtering by **Status** and **Type**.

Supported review types include:

- PROBATION
- ANNUAL
- QUARTERLY
- AD_HOC

Current workflow statuses include:

- DRAFT
- IN_PROGRESS
- AWAITING_EMPLOYEE
- COMPLETED
- CANCELLED

## 10.2 Create and assign a review

A review is created for an individual employee and can include competency areas, ratings and comments.

The overall rating is stored as a decimal value where supported.

## 10.3 Completing a review

A typical flow is:

~~~text
Create review
   ↓
DRAFT
   ↓
Start review
   ↓
IN_PROGRESS
   ↓
Assessment / competency comments
   ↓
Employee or reviewer step where applicable
   ↓
COMPLETED
~~~

Reviews can also be cancelled where permitted.

## 10.4 Employee and manager view

Employees and managers see the review information permitted to their roles.

Notifications can be generated around review actions.

### Current scope note

The current implementation does not provide a full separate goals/development-plan management workspace in the review pages described here.

---

# 11. Reports & Workforce Insights

## 11.1 Two reporting experiences

There are two HR-facing reporting areas:

### HR Reporting

A focused HR pack with five tabs.

### Reports Workspace

A broader non-payroll reporting workspace with reusable report definitions, runs and schedules.

## 11.2 HR Reporting filters

The focused HR reporting area uses:

- From
- To
- Department
- Location
- Employment type

The reports refresh from the selected controls. There is no separate Apply/Reset workflow.

## 11.3 Five HR reporting tabs

| Tab | Purpose |
|---|---|
| Headcount & turnover | Workforce numbers and movement |
| Leave liability by type | Leave balances/liability by leave type |
| Attendance & punctuality | Attendance-related HR reporting |
| Overtime | Overtime reporting |
| Certification compliance | Certification status/compliance |

CSV export is available from the HR report pack.

## 11.4 Reports workspace

The broader Reports workspace contains non-payroll system reports across:

**People, Time, Leave and Roster**, plus custom saved definitions.

Supported controls vary by report but can include:

- From / To
- Location
- Department
- Team
- Employee
- Status
- Group by
- Sort by
- Format

Export formats include:

**CSV, Excel, PDF and JSON.**

The workspace supports:

- View & export
- Save definition
- Add schedule
- Run history

## 11.5 Reporting flow

~~~text
Choose report
  ↓
Set available filters
  ↓
Group / sort where supported
  ↓
Run / View
  ↓
Review result
  ↓
Export or save definition
  ↓
Optional recurring schedule
  ↓
Run history
~~~

## 11.6 Interpreting HR reports

Different reports may use different source populations and date logic. A dashboard KPI, an employee register and a report should not automatically be assumed to represent the same population.

---

# 12. Connected Operations: Where HR Stops

HR is connected to operational and payroll workflows but does not own every step.

## 12.1 Roster → attendance → timesheet → pay

~~~text
Manager publishes roster
        ↓
Employee works / clocks
        ↓
Attendance evidence captured
        ↓
Timesheet records work
        ↓
Manager approves timesheet
        ↓
Payroll consumes approved hours
        ↓
Payroll calculates pay
~~~

HR can understand this chain and investigate employee records, but operational approval and payroll processing belong to the relevant roles.

## 12.2 Leave → payroll

~~~text
Employee / HR creates leave request
      ↓
Manager / HR approves
      ↓
Leave ledger records movement
      ↓
Payroll consumes approved leave
      ↓
Payroll finalises the relevant pay run
~~~

## 12.3 Expenses

Approval and reimbursement are separate actions.

HR may see employee context, but the expense workflow is not part of the core HR Admin menu.

## 12.4 Departures

HR starts and works the practical exit process.

Payroll processes final pay.

IT / administration handles broader access and systems not automatically controlled by the HR workflow.

---

# 13. My Workspace — HR as an Employee

If the HR user's account also has Employee self-service, the My workspace area shows the HR user's **own** employee experience.

## 13.1 My Dashboard

Personal work summary, not an organisation-wide HR overview.

## 13.2 My Roster

Includes:

- Shifts
- Availability
- Swaps
- Open shifts

## 13.3 My Timesheets

The user's own timesheet information.

## 13.4 My Leave

Includes:

- Apply
- Pending
- History
- Approvals where applicable
- Balances
- Calendar
- Holiday Calendar

There is no employee selector; the area is always about the signed-in employee.

## 13.5 My Pay

Includes the signed-in user's:

- Payslips
- Expenses

## 13.6 My Records

Includes:

- Profile
- Performance reviews
- Documents
- Policies
- Checklists
- Notifications
- Security

## 13.7 Personal security

The security area includes password recovery and session-related information available to the employee role.

My workspace does not turn the HR role into a Payroll Admin role.

---

# 14. Where the Data Goes

## 14.1 Employee identity is the hub

The employee record is the common point that connects:

~~~text
                     ┌───────────────┐
                     │   EMPLOYEE    │
                     │    RECORD     │
                     └───────┬───────┘
                             │
      ┌───────────┬──────────┼───────────┬────────────┐
      ↓           ↓          ↓           ↓            ↓
 Organisation  Employment  Onboarding  Documents   Certifications
      │           │          │           │            │
      ↓           ↓          ↓           ↓            ↓
 Managers       Payroll    Tasks       Policies     Qualifications
      │
      ↓
 Leave / Time / Operational visibility
~~~

## 14.2 Information and reuse

| Information | Entered/managed in | Reused by |
|---|---|---|
| Employee identity | Employee profile | Most workforce pages |
| Employment placement | Organisation Structure / Employment | HR reporting and payroll employment context |
| Manager relationship | Organisation Structure | Manager scope and approvals |
| Onboarding tasks | Onboarding | Employee checklist and dashboard |
| Leave request | Leave | Calendar, balance/ledger and payroll input |
| Certification | Certifications | Compliance and qualification checks |
| Policy acknowledgement | Policies / employee records | Compliance reporting |
| Performance review | Performance Reviews | Employee / manager review visibility |
| Termination | Offboarding | Payroll final-pay candidate and lifecycle records |

## 14.3 Leave is a history

The leave ledger records movements. A displayed balance is the result of those movements.

When investigating a discrepancy, use:

**employee + leave type + movement history + relevant dates**

rather than changing a displayed balance without understanding its source.

## 14.4 Time and payroll are separate layers

Clocking evidence, timesheets and payroll results are different records.

~~~text
CLOCK / ATTENDANCE EVIDENCE
          ↓
       TIMESHEET
          ↓
     APPROVAL STATUS
          ↓
    PAYROLL INPUT
          ↓
     PAY RUN RESULT
~~~

Approval is not the same as clocking, and a calculated pay amount is not the same thing as attendance evidence.

## 14.5 Documents and evidence

Document metadata and versions live with document records while file content is stored outside PostgreSQL.

Contracts connect to document versions and signatures.

Policies connect to version-specific acknowledgements.

These records answer different questions: "What is the document?", "Which version was used?", "Who signed?", and "Who acknowledged?"

## 14.6 History and messages

Workforce audit entries provide evidence about important actions.

Notifications are messages for users.

An audit entry and a notification are not the same record.

## 14.7 Shared information does not mean shared access

Two roles may rely on the same employee record while seeing different fields and destinations.

Permission checks are enforced by the destination as well as the menu.

---

# 15. Permissions & Boundaries

## 15.1 HR Admin can normally manage

- Employee records
- Organisation structure and access
- Onboarding
- Offboarding
- Employee documents
- Policies
- Certifications
- Performance reviews
- Leave approvals
- Leave settings
- HR reports

## 15.2 HR Admin does not normally operate

- Payroll calculation/finalisation
- Payroll pay rates
- Payroll bank/tax/super administration
- Payroll reports
- Attendance administration workspace
- Rostering administration
- Expense administration
- Integrations
- Platform settings
- User account administration outside HR's role/access controls
- Organisation holiday maintenance

## 15.3 Important role boundaries

### HR vs Payroll

HR owns the people record and HR lifecycle.

Payroll owns pay calculation, finalisation and payroll-sensitive records.

### HR vs Manager

HR manages organisation-wide people/structure work within scope.

Managers operate team-level roster, attendance and approval work.

### HR vs Employee

Employees use My workspace for their own information.

They do not gain organisation-wide HR visibility.

### HR vs Organisation Admin

Organisation Admin has broader platform/organisation controls.

HR should not be expected to perform organisation-admin functions.

---

# 16. Current-Build Limitations to Remember

These points are important when presenting the current product to a client.

1. **Invitation is separate from employee creation and onboarding.** Standard HR cannot send account invitations.
2. **Dashboard launch tiles navigate; they do not automatically perform the final action.**
3. **Dashboard has no dedicated refresh/date/department/location filter.**
4. **Historical dashboard charts are reconstructed from current employee records, so later corrections can change earlier chart points.**
5. **The HR Home dashboard's date comparisons use the server-side date logic described in the master guide; the browser greeting uses the browser's local clock.**
6. **Secondary manager is currently informational/display-only for approval flows; primary manager remains the operational approval relationship.**
7. **HR cannot grant/remove Payroll Admin access.**
8. **The current HR report packs and broader Reports workspace are not identical and have different source/filter capabilities.**
9. **HR can read the Holiday Calendar but does not maintain organisation holidays.**
10. **The standard HR profile deliberately excludes protected payroll-sensitive details.**
11. **Offboarding task completion does not itself revoke external-system access.**
12. **The manual "Notify manager and team" offboarding task does not automatically send the notice.**
13. **Completing HR offboarding and completing Payroll final pay are separate closure actions.**
14. **A completed exit should not be treated as proof that a linked final-pay run was paid.**
15. **The current final-payslip flow can notify an employee while simultaneously closing their portal access; external delivery may be required for a leaver's final payslip.**
16. **The employee profile leave summary should not replace review of the leave ledger when investigating balance movement.**
17. **The current performance-review pages do not provide a full separate goals/development-plan management workspace.**
18. **Some system data can legitimately be empty because the related workflow has not yet been exercised in the current demo build.**

---

# 17. Quick Workflow Maps

## 17.1 New starter

~~~text
Employee record
   ↓
Organisation placement
   ↓
Onboarding checklist
   ↓
Separate account invitation
   ↓
Nine onboarding steps
   ↓
HR verification
   ↓
ACTIVE employee
~~~

## 17.2 Organisation change

~~~text
HR opens Organisation Structure
        ↓
Department / location / team / position / manager change
        ↓
Employee structure updated
        ↓
Relevant payroll employment placement updated
        ↓
Manager / scoped views use the new relationship
~~~

## 17.3 Leave

~~~text
Apply
  ↓
Checks
  ↓
Pending
  ↓
Manager / HR decision
  ↓
Approved
  ↓
Ledger movement
  ↓
Payroll input
~~~

## 17.4 Policy

~~~text
Draft
 ↓
Publish version
 ↓
Employee receives acknowledgement requirement
 ↓
Employee acknowledges
 ↓
Version-specific evidence retained
~~~

## 17.5 Certification

~~~text
Add / import certification
       ↓
Verify if required
       ↓
Track issue / expiry
       ↓
Reminder / dashboard visibility
       ↓
Compliance check
~~~

## 17.6 Offboarding

~~~text
Start exit
   ↓
TERMINATING
   ↓
Checklist + exit work
   ↓
Payroll final-pay hand-off
   ↓
Payroll calculation/finalisation
   ↓
TERMINATED
~~~

## 17.7 HR reporting

~~~text
Choose report
    ↓
Apply supported filters
    ↓
Run / view
    ↓
Interpret population carefully
    ↓
Export or save
    ↓
Optional schedule / run history
~~~

---

# 18. Glossary

**Employee record** — the core person record shared by the workforce features.

**Employee lifecycle status** — the employee's employment-state marker such as Active, Terminating or Terminated.

**Employment type** — the person's employment classification; it is different from lifecycle status.

**Department** — the organisational unit in which a person belongs.

**Department Head** — the designated head for a department.

**Manager** — reporting-line relationship used by operational and approval workflows.

**Primary manager** — the main manager relationship currently used for relevant approval flows.

**Secondary manager** — an additional recorded reporting relationship that is currently informational for the approval flows described in the guide.

**Role** — a bundle of permissions.

**Permission scope** — the population covered by a user's permissions.

**Onboarding checklist** — a structured set of onboarding tasks.

**Termination record** — the HR record describing an employee departure.

**Leave ledger** — the movement history used to understand how a leave balance was created or consumed.

**Document version** — a specific version of a document with its own evidence trail.

**Policy acknowledgement** — an employee's acknowledgement of a particular policy version.

**Certification** — a qualification/credential record that can be tracked for expiry and compliance.

**Payroll hand-off** — the point where HR data or approved work/leave becomes payroll input for Payroll Admin processing.

**Audit evidence** — recorded history of an important action, including actor/time and relevant before/after information where supported.

---

# Final Client View

The HR dashboard is easiest to understand as a connected employee lifecycle rather than as a collection of isolated pages:

~~~text
                 PEOPLE
                   │
        ┌──────────┼───────────┐
        ↓          ↓           ↓
   STRUCTURE   ONBOARDING   COMPLIANCE
        │          │           │
        └──────────┼───────────┘
                   ↓
              ACTIVE EMPLOYEE
                   │
        ┌──────────┼───────────┐
        ↓          ↓           ↓
      LEAVE      REVIEWS      DOCUMENTS
        │
        ↓
   APPROVED WORK
        │
        ↓
   PAYROLL HAND-OFF
        │
        ↓
     OFFBOARDING
        │
        ↓
    TERMINATED + HISTORY
~~~

The key operating principle is simple: **HR maintains reliable people and workforce information; managers run day-to-day operational approvals; payroll calculates and finalises pay; employees use self-service for their own records.**

---

**Source basis:** Supplied AWP HR Dashboard User Guide, October 2026, current Southern Cross Group demo build.
