import { createClient } from '@supabase/supabase-js';
import type { ProjectRequest, PartnershipRequest, SponsorshipRequest, GeneralInquiry } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitProjectRequest(data: Omit<ProjectRequest, 'id' | 'created_at'>) {
  try {
    const { error } = await supabase
      .from('project_requests')
      .insert([{ ...data, type: 'project' }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase error:', err);
    return { success: false, error: 'Failed to submit. Please try again later.' };
  }
}

export async function submitPartnershipRequest(data: Omit<PartnershipRequest, 'id' | 'created_at'>) {
  try {
    const { error } = await supabase
      .from('partnership_requests')
      .insert([{ ...data, type: 'partnership' }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase error:', err);
    return { success: false, error: 'Failed to submit. Please try again later.' };
  }
}

export async function submitSponsorshipRequest(data: Omit<SponsorshipRequest, 'id' | 'created_at'>) {
  try {
    const { error } = await supabase
      .from('sponsorship_requests')
      .insert([{ ...data, type: 'sponsorship' }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase error:', err);
    return { success: false, error: 'Failed to submit. Please try again later.' };
  }
}

export async function submitGeneralInquiry(data: Omit<GeneralInquiry, 'id' | 'created_at'>) {
  try {
    const { error } = await supabase
      .from('general_inquiries')
      .insert([{ ...data, type: 'inquiry' }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase error:', err);
    return { success: false, error: 'Failed to submit. Please try again later.' };
  }
}
