// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Main.css';

function Main() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // 사용자 이름 상태 추가
    const [rememberMe, setRememberMe] = useState(false); // ID 기억하기 상태 추가
    const navigate = useNavigate();
    const naverClientId = "s9YZslSWIEMoe2lX0QN3"; // 네이버 API 클라이언트 ID
    const naverRedirectUri = "http://localhost:8080/api/auth/login/oauth2/code/naver"; // 백엔드 callback URI

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 ID를 로드합니다.
    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setId(savedId); // 저장된 ID를 입력 필드에 채우기
            setRememberMe(true); // 체크박스도 체크 상태로 설정
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/users/login', {
                email: id,
                password: password
            });

            setUsername(response.data.username);

            if (rememberMe) {
                localStorage.setItem('savedId', id);
            } else {
                localStorage.removeItem('savedId');
            }

            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
        }
    };

    // 네이버 로그인 버튼 클릭 핸들러
    const handleNaverLogin = async () => {
        const clientId = naverClientId;
        const redirectUri = encodeURIComponent(naverRedirectUri); // 백엔드 서버에서 이 리디렉션 URI로 콜백 처리
        const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`;

        window.location.href = naverLoginUrl;
    };

    return (
        <div className="container">
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>

            <div className="main-content">
                <div className="navigator">
                    <button onClick={() => navigate('/category/category1')}>Category 1</button>
                    <button onClick={() => navigate('/category/category2')}>Category 2</button>
                    <button onClick={() => navigate('/category/category3')}>Category 3</button>
                </div>

                <div className="login-section">
                    <h3>{username ? `${username}님 환영합니다!` : 'Login'}</h3>
                    {!username && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="custom-label">ID: </label>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="custom-label">Password: </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className="custom-label">ID 기억하기</label>
                            </div>
                            <button type="submit">로그인</button>
                            <button type="button" onClick={() => navigate('/signup')}>회원 가입</button>
                        </form>
                    )}

                    {/* 네이버 로그인 버튼 */}
                    <button onClick={handleNaverLogin} className="naver-login-btn">
                        네이버 로그인
                    </button>
                </div>
            </div>

            <div className="product-list">
                <h2>Product List</h2>
                <div className="product-item">상품 1</div>
                <div className="product-item">상품 2</div>
                <div className="product-item">상품 3</div>
                <div className="product-item">상품 4</div>
                <div className="product-item">상품 5</div>
            </div>
        </div>
    );
}

export default Main;
