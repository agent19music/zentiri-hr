# Authentication Test Credentials

This document contains all the test credentials for logging into the Zentiri HR application. All accounts use the password `password123`.

## How to Access

1. Navigate to the application homepage
2. Click "Sign In" button in the header
3. Use any of the credentials below or select from the quick login options

## Test Organizations & Accounts

### 🏢 TechCorp Kenya (Professional Plan)
**Organization ID:** `11111111-1111-1111-1111-111111111111`
**Subdomain:** `techcorp-ke`

| Role | Name | Email | Department | Team |
|------|------|--------|------------|------|
| HR Manager | Jane Smith | `jane.smith@techcorp.co.ke` | Human Resources | - |
| Department Manager | John Doe | `john.doe@techcorp.co.ke` | Engineering | Backend Development |
| Employee | Michael Johnson | `mike.johnson@techcorp.co.ke` | Engineering | Frontend Development |
| Employee | Sarah Wilson | `sarah.wilson@techcorp.co.ke` | Sales & Marketing | Digital Marketing |

### 🚀 StartupHub (Starter Plan)
**Organization ID:** `22222222-2222-2222-2222-222222222222`
**Subdomain:** `startuphub`

| Role | Name | Email | Department | Team |
|------|------|--------|------------|------|
| Organization Admin | Alice Johnson | `alice.johnson@startuphub.co.ke` | Operations | - |
| Employee | Bob Williams | `bob.williams@startuphub.co.ke` | Consulting | Strategy Consulting |

### 🏭 MegaCorp Industries (Enterprise Plan)
**Organization ID:** `33333333-3333-3333-3333-333333333333`
**Subdomain:** `megacorp`

| Role | Name | Email | Department | Team |
|------|------|--------|------------|------|
| HR Manager | Mary Davis | `mary.davis@megacorp.co.ke` | Human Resources | - |
| Department Manager | James Miller | `james.miller@megacorp.co.ke` | Production | Assembly Line A |
| Employee | Lisa Anderson | `lisa.anderson@megacorp.co.ke` | Quality Assurance | QA Testing |

## Role Permissions

### 🔐 Access Levels

- **Organization Admin (Level 2):** Full access to employer dashboard, organization settings, billing
- **HR Manager (Level 3):** Full employee management, payroll, reports, recruitment
- **Department Manager (Level 4):** Department-scoped employee management, team oversight
- **Employee (Level 10):** Employee dashboard, personal profile, leave requests, payroll view

### 📊 Dashboard Access

- **Employer Dashboard:** Available to Organization Admins, HR Managers, and Department Managers
- **Employee Dashboard:** Available to all employees and those without management roles

## Quick Testing Guide

1. **Test HR Management Features:**
   - Login as Jane Smith (TechCorp) or Mary Davis (MegaCorp)
   - Access full employer dashboard with all HR features

2. **Test Department Management:**
   - Login as John Doe (TechCorp) or James Miller (MegaCorp)
   - Limited management features scoped to department

3. **Test Employee Experience:**
   - Login as Michael Johnson, Sarah Wilson, Bob Williams, or Lisa Anderson
   - Employee dashboard with personal features

4. **Test Different Organization Sizes:**
   - TechCorp: Medium company (Professional Plan)
   - StartupHub: Small company (Starter Plan)
   - MegaCorp: Large enterprise (Enterprise Plan)

## Features to Test

### ✅ Authentication
- Login/logout functionality
- Role-based redirects
- Session persistence
- Route protection

### ✅ Dashboard Access
- Employer dashboard for managers
- Employee dashboard for staff
- Role-appropriate navigation
- Organization-specific data

### ✅ User Interface
- User avatar and profile display
- Organization context
- Theme switching
- Responsive design

## Security Notes

- All credentials are for testing purposes only
- Passwords are intentionally simple (`password123`)
- No real data should be entered
- Sessions are stored in localStorage for demo purposes

## Getting Started

Simply visit the login page and either:
1. Enter credentials manually
2. Use the test account dropdown selector
3. Click on any organization card for quick login

All dashboard features should work with appropriate role-based access control. 