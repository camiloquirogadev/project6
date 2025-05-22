import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { 
  ChevronLeft, 
  Edit, 
  Trash, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CreditCard, 
  Clock
} from 'lucide-react';

function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, invoices } = useData();
  const [contact, setContact] = useState<any>(null);
  const [contactInvoices, setContactInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        
        // Find invoices for this contact
        const relatedInvoices = invoices.filter(inv => inv.contactId === id);
        setContactInvoices(relatedInvoices);
      } else {
        // Contact not found, redirect to contacts list
        navigate('/contacts');
      }
    }
  }, [id, contacts, invoices, navigate]);
  
  if (!contact) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading contact details...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/contacts')}
            className="mr-4 p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-lg font-medium text-blue-600">
                {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
              <div className="flex items-center mt-1">
                <StatusBadge status={contact.type} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-secondary flex items-center">
            <Mail size={16} className="mr-1" />
            Email
          </button>
          <button className="btn btn-secondary flex items-center">
            <Edit size={16} className="mr-1" />
            Edit
          </button>
          <button className="btn btn-danger flex items-center">
            <Trash size={16} className="mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Contact Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <Card title="Contact Information">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <div className="mt-1 flex items-center">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <div className="mt-1 flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <a href={`tel:${contact.phone}`} className="text-gray-900">
                    {contact.phone}
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <div className="mt-1 flex items-start">
                  <MapPin size={16} className="text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-gray-900">{contact.address}</p>
                    <p className="text-gray-900">{contact.city}, {contact.postalCode}</p>
                    <p className="text-gray-900">{contact.country}</p>
                  </div>
                </div>
              </div>
              
              {contact.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1 text-gray-900">{contact.notes}</p>
                </div>
              )}
            </div>
          </Card>
          
          <div className="mt-6">
            <Card title="Related Actions">
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Create Invoice
                </button>
                <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Add Payment
                </button>
                <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Schedule Meeting
                </button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Contact Activity */}
        <div className="lg:col-span-2">
          <Card title="Invoices">
            {contactInvoices.length > 0 ? (
              <div className="space-y-4">
                {contactInvoices.map(invoice => (
                  <div 
                    key={invoice.id} 
                    className="flex items-center justify-between border-b border-gray-100 pb-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-blue-50 mr-3">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{invoice.number}</p>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-800 mr-3">
                        ${invoice.total.toLocaleString()}
                      </p>
                      <StatusBadge status={invoice.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No invoices found for this contact.
              </p>
            )}
          </Card>
          
          <div className="mt-6">
            <Card title="Recent Activity">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-blue-50 mr-3">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Invoice Created</p>
                    <p className="text-xs text-gray-500">
                      Invoice #{contactInvoices[0]?.number || 'INV-2023-001'} was created
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      2 days ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-50 mr-3">
                    <CreditCard size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Payment Received</p>
                    <p className="text-xs text-gray-500">
                      Payment of $1,500 was received
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      1 week ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-purple-50 mr-3">
                    <Clock size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Meeting Scheduled</p>
                    <p className="text-xs text-gray-500">
                      Project discussion meeting
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      2 weeks ago
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;