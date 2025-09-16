# Workshop Booking Platform - Comprehensive Enhancement Report

## 📋 **Setup Instructions**

### **Prerequisites**
- Python 3.x
- Git
- Virtual environment (recommended)

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/FOSSEE/workshop_booking.git
   cd workshop_booking
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser account**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Main application: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`

8. **Configure user roles**
   - Go to admin panel → Groups
   - Create a group called "instructor" with all permissions
   - Assign instructor role to users as needed

### **Mobile Testing Setup**
- **Chrome DevTools**: F12 → Device Toolbar
- **Firefox Responsive Design**: F12 → Responsive Design Mode
- **Safari Web Inspector**: Develop → Enter Responsive Design Mode

---
