
# Workshop Booking Platform - Comprehensive Enhancement Report

## 📋 Setup Instructions

### Prerequisites
- Python 3.x
- Git
- Virtual environment (recommended)

### Installation Steps

1. **Clone the Repository**
   ```
   git clone [https://github.com/FOSSEE/workshop_booking.git](https://github.com/FOSSEE/workshop_booking.git)
   cd workshop_booking
   ```
2. **Create and Activate Virtual Environment**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies**
   ```
   pip install -r requirements.txt
   ```
4. **Run Database Migrations**
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
5. **Create Superuser Account**
   ```
   python manage.py createsuperuser
   ```
6. **Start Development Server**
   ```
   python manage.py runserver
   ```
7. **Access the Application**
   - Main application: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`
8. **Configure User Roles**
   - Go to admin panel → Groups
   - Create a group called "instructor" with all permissions
   - Assign instructor role to users as needed

### Mobile Testing Setup
- **Chrome DevTools**: F12 → Device Toolbar
- **Firefox Responsive Design**: F12 → Responsive Design Mode
- **Safari Web Inspector**: Develop → Enter Responsive Design Mode

---

## Desktop Changes (Larger Screens)

### Landing Page

![Landing Page 1](https://github.com/user-attachments/assets/d883216e-88b0-4216-aeb7-1e0233385e21)
![Landing Page 2](https://github.com/user-attachments/assets/6792b3e1-039b-4e1d-bc5f-a0065b376f3e)
![Landing Page 3](https://github.com/user-attachments/assets/2852c984-993a-4597-bd6a-365686ddcc58)

### Registration Page

![Registration Page 1](https://github.com/user-attachments/assets/57ca7aa2-33b8-4284-b570-ecaeb62048be)
![Registration Page 2](https://github.com/user-attachments/assets/c64933ef-3dda-4c61-aac0-1597bc818511)
![Registration Page 3](https://github.com/user-attachments/assets/930c9007-d287-434d-b72b-0ecea2518776)

- Button -> Home
- Button -> Registration
- Button -> Dark Mode

### Tablet

![Tablet](https://github.com/user-attachments/assets/f553ec88-5a0d-4bca-9919-662b33d0b0d6)

### Mobile

![Mobile](https://github.com/user-attachments/assets/0a9cb77e-1877-4108-8a5c-e009a1dcef2d)

### Bottom NavBar

![Bottom NavBar](https://github.com/user-attachments/assets/d6c627d3-5eb5-4fe0-9bd7-2c33ada50300)

### Side Navbar

![Side Navbar](https://github.com/user-attachments/assets/6196166e-7103-4d0d-8dee-2f93b7cb73b6)

### Sign In (Embedded in Landing Page)

![Sign In](https://github.com/user-attachments/assets/93b8b42e-0f0c-42e5-9403-4fde91d3ccc9)

### Status Page

![Status Page](https://github.com/user-attachments/assets/9dc7a008-bb34-41fe-a8db-00c6eec5f366)

### Log Out Page

![Log Out Page](https://github.com/user-attachments/assets/5339b012-c95e-4b3a-9867-52c9e5b49c98)

### Profile Registration

![Profile Registration](https://github.com/user-attachments/assets/d5639b7a-61d6-431a-8d8a-a8444b49a6c5)

### Progress Bar

![Progress Bar 1](https://github.com/user-attachments/assets/9fb60d7f-19a0-4d4a-9548-4d1f5d1be6af)
![Progress Bar 2](https://github.com/user-attachments/assets/55b5529a-ac88-472d-ac3e-2d7f7221f9c1)

### Dark Mode

![Dark Mode 1](https://github.com/user-attachments/assets/b6f5a071-aaae-4ddb-b13b-824ea4bee846)
![Dark Mode 2](https://github.com/user-attachments/assets/1dea2127-c0ec-4b56-add9-d7b31544766a)

### Workshop Types

![Workshop Types](https://github.com/user-attachments/assets/66e73a2b-ae33-4fe2-bb9f-866881c33516)

### Propose Workshop

![Propose Workshop 1](https://github.com/user-attachments/assets/9c80d397-ffbe-48fa-bd0f-0c60f322af6d)
![Propose Workshop 2](https://github.com/user-attachments/assets/c70ac242-6c5b-447a-966d-2606eb0ad5ad)

### Statistics

![Statistics 1](https://github.com/user-attachments/assets/8efde39b-a0bf-4f30-9259-2a1741d4d010)
![Statistics 2](https://github.com/user-attachments/assets/5b721362-24f9-4783-9d77-f898ffe6cb22)

