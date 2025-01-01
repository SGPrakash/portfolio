# 3D Portfolio Website

A modern, interactive portfolio website showcasing web development and AI/LLM expertise with stunning 3D animations and responsive design.

## Features

- Interactive 3D background with particle system
- Responsive design that works on all devices
- Dynamic experience counter
- Animated skill cards with tilt effect
- Timeline-based experience display
- Modern glass-morphism design
- Mouse-interactive floating shapes

## Manual Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge recommended)
- Basic understanding of command line
- Git (optional, for deployment)
- Python (optional, for local server)

### Local Development

1. **Clone or Download**
   ```bash
   git clone <your-repository-url>
   # OR
   # Download and extract the ZIP file
   ```

2. **Add Profile Image**
   - Place your profile photo in the `assets` directory
   - Name it `profile.jpg`
   - Recommended size: 500x500 pixels

3. **Run Locally**

   Option 1: Using Python (Recommended)
   ```bash
   # Navigate to project directory
   cd portfolio

   # Python 3.x
   python -m http.server 8000

   # OR Python 2.x
   python -m SimpleHTTPServer 8000
   ```

   Option 2: Using VS Code
   - Install "Live Server" extension
   - Right-click `index.html`
   - Select "Open with Live Server"

   Option 3: Direct File
   - Simply open `index.html` in your browser
   - Note: Some features might not work due to CORS policy

4. **View Website**
   - Open your browser
   - Visit `http://localhost:8000`
   - For best experience, use a modern browser

## Deployment on GitHub

### Step-by-Step Guide

1. **Create a GitHub Repository**  
   - Go to [GitHub](https://github.com) and log in to your account.  
   - Click on the **New** button to create a new repository.  
   - Name your repository and choose its visibility (public or private).  
   - Click on **Create repository**.

2. **Initialize Git in Your Local Project Directory**  
   - Open your terminal or command prompt.  
   - Navigate to your project directory:  
     ```bash  
     cd d:/SpellTech/CV  
     ```  
   - Initialize a new Git repository:  
     ```bash  
     git init  
     ```

3. **Add the Remote Repository**  
   - Link your local repository to the GitHub repository:  
     ```bash  
     git remote add origin https://github.com/yourusername/your-repository-name.git  
     ```  
   - Replace `yourusername` and `your-repository-name` with your actual GitHub username and repository name.

4. **Commit Your Changes**  
   - Stage all your files for commit:  
     ```bash  
     git add .  
     ```  
   - Commit your changes with a message:  
     ```bash  
     git commit -m "Initial commit"  
     ```

5. **Push Your Local Repository to GitHub**  
   - Push your changes to the GitHub repository:  
     ```bash  
     git push -u origin master  
     ```

Now your project is deployed on GitHub!

## GitHub Deployment

### Method 1: GitHub Pages

1. **Create Repository**
   ```bash
   # Initialize git in your local directory
   git init

   # Add all files
   git add .

   # Commit changes
   git commit -m "Initial commit"

   # Add remote repository
   git remote add origin https://github.com/username/repository.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save changes

3. **Access Your Site**
   - Wait a few minutes for deployment
   - Visit `https://username.github.io/repository-name`

### Method 2: Custom Domain (Optional)

1. **Buy Domain Name**
   - Purchase from any domain registrar
   - Example: GoDaddy, Namecheap, Google Domains

2. **Configure DNS**
   - Add A records pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add CNAME record if using www subdomain

3. **Configure GitHub Pages**
   - Go to repository Settings
   - Under "Pages"
   - Enter your custom domain
   - Save changes
   - Wait for DNS propagation (up to 24 hours)

## Customization

### Content Modification
- Edit `index.html` to update text and sections
- Modify experience years in `main.js`
- Update skills and projects as needed

### Style Changes
- Colors: Edit CSS variables in `styles.css`
- Layout: Modify grid settings in `styles.css`
- Animations: Adjust parameters in `main.js`

### Background Customization
- Particle count: Modify `particleCount` in `main.js`
- Colors: Change particle and shape colors in `main.js`
- Animation speed: Adjust animation parameters in `main.js`

## Troubleshooting

### Common Issues

1. **Background Not Showing**
   - Check if WebGL is enabled in your browser
   - Update graphics drivers
   - Try a different modern browser

2. **Profile Image Not Loading**
   - Verify image is named `profile.jpg`
   - Check image is in `assets` directory
   - Ensure correct file permissions

3. **Animations Laggy**
   - Reduce particle count in `main.js`
   - Close other browser tabs
   - Check system resources

### Support

For issues or customization help:
1. Open an issue on GitHub
2. Check existing issues for solutions
3. Provide clear reproduction steps

## License

MIT License - feel free to use for your own portfolio!

## Credits

- Three.js for 3D graphics
- Vanilla-tilt.js for card effects
- Font Awesome for icons
