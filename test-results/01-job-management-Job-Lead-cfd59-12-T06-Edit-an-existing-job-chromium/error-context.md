# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - banner [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]:
            - heading "Job Tracker" [level=1] [ref=e7]
            - paragraph [ref=e8]: 1 active · 1 reminder
          - link "1" [ref=e9] [cursor=pointer]:
            - /url: /reminders
            - button "1" [ref=e10]:
              - img [ref=e11]
              - generic [ref=e13]: "1"
      - link "NE Newgen Product manager Follow Up Muskaan 12 minutes ago" [ref=e15] [cursor=pointer]:
        - /url: /jobs/1
        - generic [ref=e17]:
          - generic [ref=e18]: NE
          - generic [ref=e19]:
            - generic [ref=e20]:
              - generic [ref=e21]:
                - heading "Newgen" [level=3] [ref=e22]
                - paragraph [ref=e23]: Product manager
              - generic [ref=e24]: Follow Up
            - generic [ref=e25]:
              - generic [ref=e26]: Muskaan
              - generic [ref=e27]: 12 minutes ago
    - link "Add new job":
      - /url: /jobs/new
      - button "Add new job" [ref=e28] [cursor=pointer]: +
  - button "Open Next.js Dev Tools" [ref=e34] [cursor=pointer]:
    - img [ref=e35]
  - alert [ref=e38]
```