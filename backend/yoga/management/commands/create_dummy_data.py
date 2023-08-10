from django.core.management.base import BaseCommand
from django.utils import timezone
from yoga.models import Session


class Command(BaseCommand):
    help = "Create dummy session data"

    def handle(self, *args, **options):
        now = timezone.now()
        sessions = [
            Session(
                name="Energizing Sunrise Flow",
                description="Awaken your body and mind with a dynamic morning Vinyasa yoga "
                "class that revitalizes your spirit as the sun rises.",
                picture_url="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                yoga_type="Vinyasa",
                start_at=now,
                duration=60,
            ),
            Session(
                name="Serenity by the Lake",
                description="Immerse yourself in the tranquility of Annecy lake while practicing "
                "gentle Hatha yoga, finding peace in both body and soul.",
                picture_url="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                yoga_type="Hatha",
                start_at=now,
                duration=45,
            ),
            Session(
                name="Twilight Restorative Yoga",
                description="Unwind and rejuvenate in a calming Yin yoga class designed to "
                "release tension, as the day winds down into a peaceful evening.",
                picture_url="https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                yoga_type="Yin",
                start_at=now,
                duration=45,
            ),
        ]
        Session.objects.bulk_create(sessions)
        self.stdout.write(self.style.SUCCESS("Successfully created dummy data!"))
