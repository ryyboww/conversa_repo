# Convera 2.26 — Billing, Payments & Secure Project Documents

## Billing boundary
The billing module is a project-level administrative ledger, not general accounting software. It tracks invoices, payments, refunds, balances, and external processor references by Project #. Tax amounts are entered manually. Accounting classification, tax treatment, reconciliation, and financial statements remain outside this module.

## Invoice rule
A signed Project Agreement must exist before an invoice is created. Deposit invoices are allowed after signature and can satisfy the existing engagement-readiness deposit gate when recorded net payments meet the required amount.

## Payment processing
The client invoice page may display a hosted payment URL. Convera does not collect raw card/bank credentials. Payment occurs with the configured external payment provider. Record the provider transaction/reference in the project ledger afterward (or automate that later with a provider webhook).

## Document security boundary
Native uploads are limited to 4 MB per file and a conservative allow-list of PDF, DOCX, XLSX, TXT, CSV, PNG, and JPEG. Files are stored under generated keys in Netlify Blobs; filenames are metadata only. Client downloads require signed, expiring links, and operator downloads require the operator key.

Native upload does not provide malware scanning, DLP, eDiscovery, records-management certification, or regulated-data compliance. For larger files, especially sensitive records, protected health information, criminal-justice restricted data, or material subject to a client's security requirements, create an external secure-upload request using an approved provider instead.

## Retention
2.26 records document metadata but intentionally does not automate destructive retention/deletion. Establish retention policy before adding automated deletion. Signed agreements, financial records, and final deliverables may require different retention periods.
