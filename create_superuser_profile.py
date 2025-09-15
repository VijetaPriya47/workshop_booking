#!/usr/bin/env python3
import os
import sys
import django

# Ensure project root is on path
PROJECT_ROOT = "/home/vijetapriya/Desktop/Projects/workshop_booking"
if PROJECT_ROOT not in sys.path:
	sys.path.append(PROJECT_ROOT)

# Django setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'workshop_portal.settings')
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from workshop_app.models import Profile


def ensure_profiles_for_superusers() -> int:
	created_count = 0
	superusers = User.objects.filter(is_superuser=True)
	for user in superusers:
		# If a related profile exists, skip
		try:
			_ = user.profile  # Accessing will raise if missing
			print(f"Profile already exists for superuser: {user.username}")
			continue
		except Profile.DoesNotExist:
			pass

		# Build a reasonable default profile
		profile = Profile(
			user=user,
			title='Dr',
			institute='Admin Institute',
			department='computer engineering',
			phone_number='9999999999',
			position='instructor',
			how_did_you_hear_about_us='Admin',
			location='Mumbai',
			state='IN-MH',
			is_email_verified=True,
			activation_key='superuser_autocreated',
			key_expiry_time=timezone.now() + timezone.timedelta(days=3650),
		)
		profile.save()
		created_count += 1
		print(f"Created profile for superuser: {user.username} (id={profile.id})")

	return created_count


if __name__ == "__main__":
	num_created = ensure_profiles_for_superusers()
	if num_created == 0:
		print("All superusers already have profiles.")
	else:
		print(f"Done. Created {num_created} profile(s).")
