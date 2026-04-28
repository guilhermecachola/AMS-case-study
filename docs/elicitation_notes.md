# Elicitation Notes — Lab 2 (AMS)

## Interview setup
- Date: 2026-02-16
- Client team: AMS Transition Lead (simulated)
- DevTeam: Requirements Analyst (individual work)
- Slice discussed: Intake & Discovery (AMS)
- Variant: 4 — Data Quality & Consistency

## Context anchors (AMS)
- Sector: Healthcare
- Solution type: Custom ERP + Data Platform
- Support model: L1/L2/L3, 24/7, English & Portuguese
- Key transition pain points (summary):
  - Missing monitoring information
  - Inconsistent DR test records
  - Unclear ownership of integrations
  - Incomplete documentation during handover

## Questions & Answers (min. 10)

1. Q: What information is most frequently missing during intake?
   A: Disaster Recovery test dates and integration ownership.

2. [Evidence] Q: What evidence proves DR testing was performed?
   A: A signed DR test report with execution date and responsible owner.

3. [Variant] Q: Should the system detect inconsistencies between risk level and provided evidence?
   A: Yes, high-risk systems must always include supporting documentation.

4. Q: Who provides monitoring documentation?
   A: Usually the application owner or operations lead.

5. [Evidence] Q: How recent must monitoring evidence be?
   A: No older than 6 months.

6. [Variant] Q: If a project duration exceeds 12 months, should additional planning documents be required?
   A: Yes, a milestone plan must be attached.

7. Q: What happens if required fields are missing?
   A: The intake cannot move forward.

8. [Variant] Q: Should the system classify submissions as incomplete vs invalid?
   A: Yes. Missing data = Incomplete. Inconsistent data = Invalid.

9. [Evidence] Q: Who validates the authenticity of submitted evidence?
   A: The Data Steward or Quality Manager.

10. Q: Are there recurring data consistency issues?
    A: Yes, risk marked as “Low” while critical integrations are listed.

## Assumptions (min. 3)

- A1: Evidence documents are uploaded in digital format.
- A2: Risk level is manually provided by the stakeholder.
- A3: Budget thresholds are predefined and stable.

## Open questions (min. 3)

- Q1: What defines “high-risk” formally? (score or manual classification?)
- Q2: [Variant] Should cross-field rules be configurable or fixed?
- Q3: [Variant] What is the exact rule for evidence freshness validation?

## Variant notes (required)

- How did the variant change our elicitation focus?
  - We emphasized cross-field validation rules.
  - We focused on inconsistent states and invalid classification.
  - We added explicit evidence consistency checks.