-- Create a new storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload files to the 'resumes' bucket
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- Policy to allow anyone to view resumes (since profile videos might be public)
CREATE POLICY "Public resumes are viewable by everyone"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'resumes' );


-- Policy to allow users to update/delete their own resumes
CREATE POLICY "Users can update their own resumes"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid );

CREATE POLICY "Users can delete their own resumes"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'resumes' AND auth.uid() = (storage.foldername(name))[1]::uuid );
