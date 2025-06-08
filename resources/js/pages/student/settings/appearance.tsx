import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { RootContent } from '@/components/root-content';
import { StudentSettingsNavigation } from '@/components/student-settings-navigation';
import { Card, CardContent } from '@/components/ui/card';
import RootLayout from '@/layouts/root-layout';
import { Head } from '@inertiajs/react';

export default function Appearance() {
  return (
    <RootLayout>
      <Head title="Appearance settings" />
      <RootContent className="pt-32">
        <div className="grid grid-cols-1 gap-5 px-40 md:grid-cols-[1fr_3fr]">
          <StudentSettingsNavigation />

          <div className="space-y-6">
            <HeadingSmall
              title="Appearance settings"
              description="Update your account's appearance settings"
            />
            <Card>
              <CardContent>
                <AppearanceTabs />
              </CardContent>
            </Card>
          </div>
        </div>
      </RootContent>
    </RootLayout>
  );
}
