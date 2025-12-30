import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 0.8rem;
    width: 90%;
    max-width: 600px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
    
    &:hover {
        color: #333;
    }
`;

const ModalTitle = styled.h2`
    color: #3080c9;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const TextArea = styled.textarea`
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    min-height: 100px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const Select = styled.select`
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const KHOA_LIST = [
    'Khoa Khoa học Ứng dụng / Cơ bản',
    'Khoa Cơ khí – Chế tạo máy',
    'Khoa Điện – Điện tử',
    'Khoa Cơ khí Động lực',
    'Khoa Công nghệ Thông tin',
    'Khoa Công trình Xây dựng',
    'Khoa Kinh tế',
    'Khoa Ngoại ngữ',
    'Khoa Công nghệ Hóa học & Thực phẩm',
    'Khoa Công nghệ Dệt may & Thiết kế thời trang',
    'Khoa Chính trị – Nhân văn',
    'Khoa Đào tạo Quốc tế',
    'Khoa Đào tạo Chất lượng cao'
];

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
`;

const Button = styled.button`
    padding: 0.8rem 1.5rem;
    border-radius: 0.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    ${props => props.primary ? `
        background: #1877f2;
        color: white;
        border: none;
        
        &:hover {
            background: #1661c6;
        }
    ` : `
        background: white;
        color: #666;
        border: 1px solid #ddd;
        
        &:hover {
            border-color: #1877f2;
            color: #1877f2;
        }
    `}
`;

const RecruitmentPlanModal = ({ isOpen, onClose, initialData, onSubmit }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get('title'),
            position: formData.get('position'),
            school: formData.get('school'),
            quantity: parseInt(formData.get('quantity')),
            cpa: parseFloat(formData.get('cpa')),
            creatDate: formData.get('creatDate') || new Date().toISOString().split('T')[0]
        };
        onSubmit(data);
    };

    return (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <ModalContent>
                <CloseButton onClick={onClose}>
                    <FaTimes />
                </CloseButton>
                
                <ModalTitle>
                    {initialData ? 'Chỉnh sửa kế hoạch tuyển dụng' : 'Thêm kế hoạch tuyển dụng mới'}
                </ModalTitle>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">Tiêu đề kế hoạch</Label>
                        <Input
                            id="title"
                            name="title"
                            required
                            defaultValue={initialData?.title}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="position">Vị trí tuyển dụng</Label>
                        <Input
                            id="position"
                            name="position"
                            required
                            defaultValue={initialData?.position}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="school">Khoa</Label>
                        <Select
                            id="school"
                            name="school"
                            required
                            defaultValue={initialData?.school || ''}
                        >
                            <option value="">-- Chọn Khoa --</option>
                            {KHOA_LIST.map((khoa, index) => (
                                <option key={index} value={khoa}>{khoa}</option>
                            ))}
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="quantity">Số lượng</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            required
                            defaultValue={initialData?.quantity}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="cpa">Yêu cầu CPA</Label>
                        <Input
                            id="cpa"
                            name="cpa"
                            type="number"
                            step="0.01"
                            min="0"
                            max="4"
                            required
                            defaultValue={initialData?.cpa}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="creatDate">Ngày tạo</Label>
                        <Input
                            id="creatDate"
                            name="creatDate"
                            type="date"
                            defaultValue={initialData?.creatDate?.split('T')[0] || new Date().toISOString().split('T')[0]}
                        />
                    </FormGroup>

                    <ButtonGroup>
                        <Button type="button" onClick={onClose}>Hủy</Button>
                        <Button type="submit" primary>
                            {initialData ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default RecruitmentPlanModal;