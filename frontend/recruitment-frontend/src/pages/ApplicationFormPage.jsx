import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaFileUpload, FaCheckCircle } from 'react-icons/fa';
import JobPostingService from '../services/JobPostingService';
import ApplicationService from '../services/ApplicationService';
import FileUploadService from '../services/FileUploadService';
import PublicLayout from '../layouts/PublicLayout';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
`;

const Card = styled.div`
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    
    h1 {
        font-size: 2rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    
    p {
        font-size: 1rem;
        color: #7f8c8d;
    }
`;

const JobInfo = styled.div`
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    
    h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
    
    p {
        margin: 0.5rem 0;
        color: #555;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: ${props => props.single ? '1fr' : '1fr 1fr'};
    gap: 1.5rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 600;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
        color: #1877f2;
    }
    
    span.required {
        color: #e74c3c;
    }
`;

const Input = styled.input`
    padding: 0.8rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #1877f2;
    }
    
    &:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
    }
`;

const Select = styled.select`
    padding: 0.8rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const FileInputWrapper = styled.div`
    position: relative;
    border: 2px dashed #1877f2;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: ${props => props.hasFile ? '#e8f5e9' : '#f8f9fa'};
    
    &:hover {
        background: #e3f2fd;
        border-color: #0d6efd;
    }
    
    input {
        display: none;
    }
`;

const FileInfo = styled.div`
    margin-top: 1rem;
    color: #555;
    font-size: 0.9rem;
`;

const SubmitButton = styled.button`
    padding: 1rem;
    background: #1877f2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    &:hover:not(:disabled) {
        background: #0d6efd;
    }
    
    &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    background: #ffe6e6;
    color: #c0392b;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
    background: #d4edda;
    color: #155724;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    
    h2 {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        
        svg {
            color: #28a745;
            font-size: 2rem;
        }
    }
`;

const BackButton = styled.button`
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    background: white;
    color: #1877f2;
    border: 2px solid #1877f2;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #1877f2;
        color: white;
    }
`;

const ApplicationFormPage = () => {
    const { jobId } = useParams(); // This is actually planId from notification
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        address: '',
        cpa: '',
        sex: 'Nam',
        cvFile: null,
        cvPath: ''
    });

    useEffect(() => {
        if (jobId) {
            fetchJobDetails();
        }
    }, [jobId]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            let data;
            
            // Try to get job posting by planId first (from notification)
            try {
                data = await JobPostingService.getJobPostingByPlanId(jobId);
            } catch (e) {
                // Fallback 1: try to get by job posting ID
                try {
                    data = await JobPostingService.getJobPostingById(jobId);
                } catch (e2) {
                    // Fallback 2: try to get approved plan directly
                    try {
                        const planData = await JobPostingService.getApprovedPlanById(jobId);
                        // Convert plan data to job-like format
                        data = {
                            title: planData.title,
                            position: planData.position,
                            school: planData.school,
                            quantity: planData.quantity,
                            requiredCpa: planData.cpa,
                            deadline: planData.approvDate,
                            planid: planData.planid,
                            positionID: null // No job position yet
                        };
                    } catch (e3) {
                        throw new Error('Không tìm thấy thông tin tuyển dụng');
                    }
                }
            }
            
            setJob(data);
            // Pre-fill position and department from job
            setFormData(prev => ({
                ...prev,
                position: data.position || '',
                department: data.school || ''
            }));
            setError(null);
        } catch (err) {
            console.error('Error loading job:', err);
            setError('Không thể tải thông tin tin tuyển dụng');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            setError('Chỉ chấp nhận file PDF hoặc Word (.doc, .docx)');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Kích thước file không được vượt quá 5MB');
            return;
        }

        try {
            setUploading(true);
            setError(null);
            const response = await FileUploadService.uploadCV(file);
            setFormData(prev => ({
                ...prev,
                cvFile: file,
                cvPath: response.filePath
            }));
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Không thể tải lên file CV. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.cvPath) {
            setError('Vui lòng tải lên CV của bạn');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const applicationData = {
                fullName: formData.fullName,
                dateOfBirth: formData.dateOfBirth,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                department: formData.department,
                address: formData.address,
                cpa: parseFloat(formData.cpa),
                sex: formData.sex,
                cvPath: formData.cvPath,
                positionID: job?.positionID || null
            };

            await ApplicationService.submitApplication(applicationData);
            setSuccess(true);
        } catch (err) {
            console.error('Error submitting application:', err);
            setError(err.response?.data?.error || 'Không thể gửi hồ sơ. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <PublicLayout>
                <Container>
                    <Card>Đang tải thông tin...</Card>
                </Container>
            </PublicLayout>
        );
    }

    if (success) {
        return (
            <PublicLayout>
                <Container>
                    <Card>
                        <SuccessMessage>
                            <h2>
                                <FaCheckCircle />
                                Nộp hồ sơ thành công!
                            </h2>
                            <p>Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                            <BackButton onClick={() => navigate('/jobs')}>
                                Xem các vị trí khác
                            </BackButton>
                        </SuccessMessage>
                    </Card>
                </Container>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Container>
                <Card>
                    <Header>
                        <h1>Đơn ứng tuyển</h1>
                        <p>Vui lòng điền đầy đủ thông tin bên dưới</p>
                    </Header>

                    {job && (
                        <JobInfo>
                            <h3>{job.title}</h3>
                            <p><strong>Vị trí:</strong> {job.position}</p>
                            <p><strong>Khoa:</strong> {job.school}</p>
                            <p><strong>GPA yêu cầu:</strong> ≥ {job.requiredCpa}</p>
                            <p><strong>Hạn nộp:</strong> {new Date(job.deadline).toLocaleDateString('vi-VN')}</p>
                        </JobInfo>
                    )}

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Form onSubmit={handleSubmit}>
                        <FormRow>
                            <FormGroup>
                                <Label>
                                    <FaUser />
                                    Họ và tên <span className="required">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Nguyễn Văn A"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <FaCalendarAlt />
                                    Ngày sinh <span className="required">*</span>
                                </Label>
                                <Input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <Label>
                                    <FaEnvelope />
                                    Email <span className="required">*</span>
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="email@example.com"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <FaPhone />
                                    Số điện thoại <span className="required">*</span>
                                </Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0912345678"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <Label>
                                    Giới tính <span className="required">*</span>
                                </Label>
                                <Select
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </Select>
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <FaGraduationCap />
                                    GPA/CPA <span className="required">*</span>
                                </Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="cpa"
                                    value={formData.cpa}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="3.5"
                                    min="0"
                                    max="4"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow single>
                            <FormGroup>
                                <Label>
                                    Vị trí ứng tuyển <span className="required">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    readOnly
                                    disabled
                                    style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow single>
                            <FormGroup>
                                <Label>
                                    Khoa/Bộ môn <span className="required">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    readOnly
                                    disabled
                                    style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow single>
                            <FormGroup>
                                <Label>
                                    <FaMapMarkerAlt />
                                    Địa chỉ <span className="required">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Số nhà, đường, phường, quận, thành phố"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <Label>
                                <FaFileUpload />
                                Upload CV (PDF hoặc Word) <span className="required">*</span>
                            </Label>
                            <FileInputWrapper 
                                hasFile={formData.cvFile}
                                onClick={() => document.getElementById('cv-upload').click()}
                            >
                                <input
                                    id="cv-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                                {uploading ? (
                                    <p>Đang tải lên...</p>
                                ) : formData.cvFile ? (
                                    <>
                                        <FaCheckCircle size={40} color="#28a745" />
                                        <FileInfo>
                                            <strong>{formData.cvFile.name}</strong>
                                            <br />
                                            ({(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </FileInfo>
                                    </>
                                ) : (
                                    <>
                                        <FaFileUpload size={40} color="#1877f2" />
                                        <FileInfo>
                                            Nhấn để chọn file CV<br />
                                            (Tối đa 5MB, định dạng PDF hoặc Word)
                                        </FileInfo>
                                    </>
                                )}
                            </FileInputWrapper>
                        </FormGroup>

                        <SubmitButton type="submit" disabled={submitting || uploading}>
                            {submitting ? 'Đang gửi...' : 'Nộp hồ sơ'}
                        </SubmitButton>

                        <BackButton type="button" onClick={() => navigate('/jobs')}>
                            Quay lại
                        </BackButton>
                    </Form>
                </Card>
            </Container>
        </PublicLayout>
    );
};

export default ApplicationFormPage;
