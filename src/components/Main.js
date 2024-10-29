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
            // 로그인 요청
            const response = await axios.post('/api/users/login', {
                email: id, // ID를 email로 매핑
                password: password
            });

            // 성공적으로 로그인한 경우
            console.log('Login successful:', response.data);
            setUsername(response.data.username); // 사용자 이름 저장

            // ID 기억하기 처리
            if (rememberMe) {
                localStorage.setItem('savedId', id); // ID 저장
            } else {
                localStorage.removeItem('savedId'); // 체크 해제 시 ID 삭제
            }

            // 필요한 경우 다른 페이지로 이동
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
        }
    };

    return (
        <div className="container">
            {/* 검색 UI */}
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>

            <div className="main-content">
                {/* 내비게이터 */}
                <div className="navigator">
                    <button onClick={() => navigate('/category/category1')}>Category 1</button>
                    <button onClick={() => navigate('/category/category2')}>Category 2</button>
                    <button onClick={() => navigate('/category/category3')}>Category 3</button>
                </div>

                {/* 로그인 div UI 시작 */}
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
                            <button type="submit">Login</button>
                            <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
                        </form>
                    )}
                </div>
                {/* 로그인 div UI 끝 */}
            </div>

            {/* 상품 목록 영역 */}
            <div className="product-list">
                <h2>Product List</h2>
                {/* 여기에 상품 카드나 리스트를 추가할 수 있습니다. */}
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
