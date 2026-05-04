# EmailJS Contact Form Setup

## Template Configuration

Create a new EmailJS template with ID: `template_contact_mku`

### Template Variables

Use these variables in your EmailJS template:

```
{{to_email}} - Recipient email (awscloudclub.mku@gmail.com)
{{from_name}} - Sender's full name
{{from_email}} - Sender's email address
{{subject}} - Message subject (optional)
{{message}} - Message content
{{submission_date}} - Timestamp of submission
```

### Sample Email Template

**Subject Line:**
```
New Contact Message: {{subject}}
```

**Email Body:**
```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Date:</strong> {{submission_date}}</p>

<hr>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>

<p><em>This message was sent via the MKU Builder System contact form.</em></p>
```

### EmailJS Dashboard Setup

1. Go to https://dashboard.emailjs.com
2. Navigate to **Email Templates**
3. Click **Create New Template**
4. Set Template ID: `template_contact_mku`
5. Configure the template with the variables above
6. Set **To Email** to: `awscloudclub.mku@gmail.com`
7. Test the template
8. Save and activate

### Current Configuration

- **Service ID:** `service_be3ds85`
- **Template ID:** `template_contact_mku` (needs to be created)
- **Public Key:** `DiIq_Jyufw19_CGfy`

### Testing

After setup, test the contact form by:
1. Fill out all required fields
2. Submit the form
3. Check for success message
4. Verify email received at awscloudclub.mku@gmail.com

### Fallback

If EmailJS fails, users can still email directly via the mailto link in the sidebar.
