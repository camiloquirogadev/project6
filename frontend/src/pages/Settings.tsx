import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { Save, User,Trash2, Building, CreditCard, Bell, Shield, HelpCircle } from 'lucide-react';
import { AddPaymentModal } from '../components/modals/AddPaymentModal';

function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAddPaymentOpen, setAddPaymentOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  // Tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'company', label: 'Company', icon: <Building size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={18} /> },
  ];
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings user={user} />;
      case 'company':
        return (
          <CompanySettings
            logo={companyLogo}
            setLogo={setCompanyLogo}
          />
        );
      case 'billing':
        return (
          <BillingSettings onAddPayment={() => setAddPaymentOpen(true)} />
        );
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'help':
        return <HelpSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>
        {/* Add Payment Method Modal */}
        {isAddPaymentOpen && (
          <AddPaymentModal
            onClose={() => setAddPaymentOpen(false)}
            onSave={(newMethod: any) => {
              console.log('New payment method:', newMethod);
              setAddPaymentOpen(false);
              // TODO: integrate API call to save payment method
            }}
          />
        )}
        {/* Main Content */}

        {/* Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );// Profile Settings Component
  function ProfileSettings({ user }: { user: any }) {
    return (
      <Card title="Profile Settings">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg font-medium text-blue-600">
                  {user?.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <button className="mt-1 text-sm text-blue-600 hover:text-blue-800">
                Change avatar
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 input"
                  defaultValue={user?.name.split(' ')[0]}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 input"
                  defaultValue={user?.name.split(' ')[1] || ''}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 input"
                  defaultValue={user?.email}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                className="mt-1 input"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary flex items-center">
                <Save size={16} className="mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }


type CompanySettingsProps = {
  logo: string | null;
  setLogo: (logo: string | null) => void;
};

function CompanySettings({ logo, setLogo }: CompanySettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasData, setHasData] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('Argentina');

  useEffect(() => {
    const stored = localStorage.getItem('companyData');
    if (stored) {
      const data = JSON.parse(stored);
      setCompanyName(data.companyName || '');
      setTaxId(data.taxId || '');
      setWebsite(data.website || '');
      setIndustry(data.industry || '');
      setStreet(data.street || '');
      setCity(data.city || '');
      setState(data.state || '');
      setZipCode(data.zipCode || '');
      setCountry(data.country || '');
      if (data.logo) setLogo(data.logo);
      setHasData(true);
    }
  }, [setLogo]);

  const handleSave = () => {
    const data = {
      companyName,
      taxId,
      website,
      industry,
      street,
      city,
      state,
      zipCode,
      country,
      logo,
    };
    localStorage.setItem('companyData', JSON.stringify(data));
    setIsEditing(false);
    setHasData(true);
  };

  const handleDelete = () => {
    localStorage.removeItem('companyData');
    setCompanyName('');
    setTaxId('');
    setWebsite('');
    setIndustry('Technology');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setCountry('Argentina');
    setLogo(null);
    setIsEditing(false);
    setHasData(false);
  };

  return (
    <Card title="Company Information">
      {/* Vista: datos cargados */}
      {hasData && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {logo && (
              <img src={logo} alt="Logo" className="h-16 w-16 rounded-md object-cover border" />
            )}
            <div>
              <h2 className="text-lg font-bold text-gray-900">{companyName}</h2>
              <p className="text-sm text-gray-600">{website}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Tax ID:</strong> {taxId}<br />
            <strong>Industry:</strong> {industry}<br />
            <strong>Address:</strong> {street}, {city}, {state}, {zipCode}, {country}
          </p>
          {!isEditing && (
            <div className="flex justify-end">
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}

      {/* Formulario de edición */}
      {(isEditing || !hasData) && (
        <div className="space-y-6 mt-6 border-t pt-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-16 w-16 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img src={logo} alt="Company Logo" className="h-16 w-16 object-cover rounded-md" />
                ) : (
                  <Building size={24} className="text-gray-500" />
                )}
              </div>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="uploadLogo"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setLogo(imageUrl);
                  }
                }}
              />
              <label htmlFor="uploadLogo" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                Upload logo
              </label>
              <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px, max 1MB</p>
            </div>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Company Name" value={companyName} setValue={setCompanyName} />
            <InputField label="Tax ID / VAT Number" value={taxId} setValue={setTaxId} />
            <InputField label="Website" value={website} setValue={setWebsite} type="url" />
            <SelectField label="Industry" value={industry} setValue={setIndustry} options={[
              "Technology", "Retail", "Manufacturing", "Services", "Healthcare", "Other"
            ]} />
          </div>

          <h3 className="font-medium text-gray-900 mt-6 mb-3">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Street Address" value={street} setValue={setStreet} full />
            <InputField label="City" value={city} setValue={setCity} />
            <InputField label="State / Province" value={state} setValue={setState} />
            <InputField label="Zip / Postal Code" value={zipCode} setValue={setZipCode} />
            <SelectField label="Country" value={country} setValue={setCountry} options={[
              "Argentina", "Brazil", "Chile", "Colombia", "Mexico", "Peru", "Uruguay", "Venezuela",
              "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Spain"
            ]} />
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button onClick={handleDelete} className="btn btn-destructive flex items-center">
              <Trash2 size={16} className="mr-1" />
              Eliminar
            </button>
            <button onClick={handleSave} className="btn btn-primary flex items-center">
              <Save size={16} className="mr-1" />
              Guardar cambios
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

// Componentes auxiliares
type InputFieldProps = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  full?: boolean;
};

function InputField({ label, value, setValue, type = "text", full = false }: InputFieldProps) {
  const id = label.toLowerCase().replace(/ /g, "");
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="mt-1 input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  options: string[];
};

function SelectField({ label, value, setValue, options }: SelectFieldProps) {
  const id = label.toLowerCase().replace(/ /g, "");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        className="mt-1 input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
// Billing Settings Component
  function BillingSettings({ onAddPayment }: { onAddPayment: () => void }) {
    return (
      <Card title="Billing & Subscription">
        <div className="space-y-6">
          {/* Current plan info */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Current Plan: Professional</h3>
            <p className="text-sm text-blue-600 mt-1">Your subscription renews on Dec 31, 2025</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>

            {/* Existing payment method display */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-md mr-3 border border-gray-200">
                  <CreditCard size={20} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Edit
              </button>
            </div>

            {/* Add new payment method button */}
            <button
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={onAddPayment}
            >
              + Add new payment method
            </button>

            {/* Billing address form fields can go here */}
          </div>
        </div>
      </Card>
    );
  }

  // Other settings components are simplified
  function NotificationSettings() {
    return (
      <Card title="Notification Preferences">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-xs text-gray-500">Receive email notifications for important events</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="emailNotifications" defaultChecked className="sr-only" />
                <label htmlFor="emailNotifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Invoice Alerts</h3>
                <p className="text-xs text-gray-500">Get notified when invoices are created or paid</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="invoiceAlerts" defaultChecked className="sr-only" />
                <label htmlFor="invoiceAlerts" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Marketing Communications</h3>
                <p className="text-xs text-gray-500">Receive updates about new features and offers</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="marketingComms" className="sr-only" />
                <label htmlFor="marketingComms" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary flex items-center">
              <Save size={16} className="mr-1" />
              Save Preferences
            </button>
          </div>
        </div>
      </Card>
    );
  }

  function SecuritySettings() {
    return (
      <Card title="Security Settings">
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="mt-1 input"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 input"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 input"
                />
              </div>
            </div>

            <div className="mt-4">
              <button className="btn btn-primary">
                Update Password
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>

            <p className="text-sm text-gray-500 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>

            <button className="btn btn-secondary">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </Card>
    );
  }

  function HelpSettings() {
    return (
      <Card title="Help & Support">
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Documentation</h3>

            <p className="text-sm text-gray-500 mb-4">
              Check our comprehensive documentation for guides and tutorials on using the platform.
            </p>

            <button className="btn btn-secondary">
              View Documentation
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Contact Support</h3>

            <p className="text-sm text-gray-500 mb-4">
              Need help? Our support team is here to assist you.
            </p>

            <div>
              <label htmlFor="supportSubject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="supportSubject"
                className="mt-1 input"
                placeholder="What do you need help with?"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="supportMessage" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="supportMessage"
                rows={4}
                className="mt-1 input"
                placeholder="Describe your issue in detail"
              ></textarea>
            </div>

            <div className="mt-4">
              <button className="btn btn-primary">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
export default Settings;
