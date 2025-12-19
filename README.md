# Project Alpha - Login Setup

## Files Structure
```
your-repo/
├── index.html          # Login page
├── api/
│   └── login.js        # Vercel serverless function
├── package.json
├── Project_Alpha/
│   └── index.html      # Your protected page (redirect target)
```

## Setup Instructions

### 1. Add Environment Variable in Vercel

Go to your Vercel project → Settings → Environment Variables

Add:
- **Name:** `MONGODB_URI`  
- **Value:** `mongodb+srv://nyk2000m_db_user:kqjF97I6a7riPROg@anyruok.mn3dqir.mongodb.net/Project_Alpha?retryWrites=true&w=majority`

### 2. Push to GitHub

```bash
git add .
git commit -m "Add login page"
git push
```

### 3. Deploy on Vercel

Vercel will automatically deploy when you push to GitHub.

## MongoDB Collection Structure

Your `User_Info` collection should have documents like:
```json
{
  "email": "user@example.com",
  "passwordHash": "$2a$12$...",  // bcrypt hash (cost factor 12)
  "name": { "first": "...", "last": "..." },
  "roles": "Super Admin",
  "isActive": true
}
```

## Security Notes

⚠️ **Important:** After testing, consider:
1. Adding JWT tokens for session management
2. Adding rate limiting to prevent brute force
3. Implementing HTTPS only (Vercel does this by default)
