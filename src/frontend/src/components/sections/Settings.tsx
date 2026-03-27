import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AlertCircle,
  Bell,
  Lock,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    id: "privacy",
    label: "Privacy & Data",
    icon: <Shield className="w-4 h-4" />,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=1"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="border-gray-200"
                    data-ocid="settings.profile.upload"
                  >
                    Upload New Photo
                  </Button>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    defaultValue="Admin"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    data-ocid="settings.profile.firstname"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    defaultValue="User"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    data-ocid="settings.profile.lastname"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  type="email"
                  defaultValue="admin@gocareer.com"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  data-ocid="settings.profile.email"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  defaultValue="+1 (555) 123-4567"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  data-ocid="settings.profile.phone"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Timezone
                </Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="settings.profile.save"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  data-ocid="settings.security.current"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  data-ocid="settings.security.new"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  data-ocid="settings.security.confirm"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="settings.security.update"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
              <Button
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="settings.security.2fa"
              >
                Enable 2FA
              </Button>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Chrome on Windows
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last active: Today at 2:30 PM
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Current
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Safari on iPhone
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last active: March 23, 2026
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  data-ocid="settings.security.revoke"
                >
                  Revoke
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "New Recruiter Registrations",
                  description: "Get notified when a new recruiter signs up",
                },
                {
                  label: "New Job Postings",
                  description: "Receive alerts for new job listings",
                },
                {
                  label: "Pending Approvals",
                  description: "Notifications for items awaiting review",
                },
                {
                  label: "Subscription Updates",
                  description: "Changes to subscription plans and billing",
                },
                {
                  label: "Support Tickets",
                  description: "New support tickets and responses",
                },
                {
                  label: "System Alerts",
                  description: "Important system and security notifications",
                },
              ].map((notification) => (
                <div
                  key={notification.label}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {notification.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded mt-1 cursor-pointer accent-blue-600"
                    data-ocid={`settings.notifications.${notification.label}`}
                  />
                </div>
              ))}

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="settings.notifications.save"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy & Data Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm border-l-4 border-l-blue-500 bg-blue-50">
            <CardContent className="p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Data Privacy Notice
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Any changes to privacy settings may affect your account functionality. Please review our privacy policy before making changes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Analytics Tracking",
                  description: "Allow us to track your activity for insights",
                },
                {
                  label: "Marketing Emails",
                  description: "Receive emails about new features and updates",
                },
                {
                  label: "Crash Reports",
                  description: "Help us improve by sending crash reports",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={item.label !== "Marketing Emails"}
                    className="rounded mt-1 cursor-pointer accent-blue-600"
                    data-ocid={`settings.privacy.${item.label}`}
                  />
                </div>
              ))}

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="settings.privacy.save"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* Data Export */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Download or delete your data at any time
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gray-200"
                  data-ocid="settings.privacy.export"
                >
                  Download My Data
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  data-ocid="settings.privacy.delete"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
