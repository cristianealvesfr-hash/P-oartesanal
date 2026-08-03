import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './LegalModal.css';

export const LegalModal = ({ type, onClose }) => {
  useEffect(() => {
    // Bloquear scroll do body quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const content = {
    privacy: {
      title: "Política de Privacidade",
      text: (
        <div className="legal-text">
          <p><strong>Última atualização: {new Date().toLocaleDateString('pt-BR')}</strong></p>
          <p>A <strong>Pão de Casa - Padaria Artesanal</strong> valoriza a privacidade dos seus clientes. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
          
          <h3>1. Coleta de Dados Pessoais</h3>
          <p>Coletamos dados mínimos necessários para a prestação dos nossos serviços de encomenda. Ao realizar um pedido, você é redirecionado para o WhatsApp, onde podemos solicitar:</p>
          <ul>
            <li>Nome completo</li>
            <li>Número de telefone</li>
            <li>Endereço para entrega (se aplicável)</li>
          </ul>

          <h3>2. Uso das Informações</h3>
          <p>Os dados coletados via WhatsApp são utilizados exclusivamente para:</p>
          <ul>
            <li>Processar e entregar o seu pedido.</li>
            <li>Entrar em contato sobre o andamento da encomenda.</li>
            <li>Responder a dúvidas e prestar suporte.</li>
          </ul>

          <h3>3. Compartilhamento de Dados</h3>
          <p>A Pão de Casa não vende, aluga ou compartilha seus dados pessoais com terceiros para fins de marketing. Seus dados são mantidos em sigilo e acessados apenas pelos funcionários responsáveis pela sua encomenda.</p>

          <h3>4. Cookies</h3>
          <p>Nosso site utiliza cookies básicos para melhorar a sua experiência de navegação e salvar preferências (como o aceite deste termo). Não utilizamos cookies invasivos de rastreamento de terceiros.</p>

          <h3>5. Direitos do Titular (LGPD)</h3>
          <p>Você tem o direito de solicitar o acesso, a correção ou a exclusão dos seus dados pessoais mantidos por nós a qualquer momento. Para exercer seus direitos, entre em contato via WhatsApp no número <strong>(31) 97362-3218</strong>.</p>
        </div>
      )
    },
    terms: {
      title: "Termos de Uso",
      text: (
        <div className="legal-text">
          <p><strong>Última atualização: {new Date().toLocaleDateString('pt-BR')}</strong></p>
          <p>Bem-vindo ao site da <strong>Pão de Casa - Padaria Artesanal</strong>. Ao acessar e utilizar este site, você concorda com os Termos de Uso descritos abaixo.</p>

          <h3>1. Nossos Serviços</h3>
          <p>Este site funciona como um catálogo digital para a exibição dos nossos pães artesanais. As encomendas são montadas no carrinho e finalizadas diretamente pelo WhatsApp.</p>

          <h3>2. Encomendas e Prazos</h3>
          <p>Trabalhamos <strong>sob encomenda</strong>, com antecedência mínima de 24 horas. A confirmação do pedido só ocorre após o atendimento no WhatsApp e o respectivo pagamento (ou sinal acordado).</p>

          <h3>3. Preços e Pagamentos</h3>
          <p>Os preços exibidos no site estão em Reais (BRL) e podem sofrer alterações sem aviso prévio. As formas de pagamento aceitas são PIX, Dinheiro e Cartões (Crédito/Débito) na retirada, sujeitos à nossa política de recebimento.</p>

          <h3>4. Propriedade Intelectual</h3>
          <p>Todo o conteúdo deste site, incluindo imagens, logotipos, textos e design, é de propriedade exclusiva da Pão de Casa. É proibida a reprodução sem autorização prévia.</p>

          <h3>5. Modificações</h3>
          <p>Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. O uso contínuo do site após as alterações constitui aceitação dos novos termos.</p>
        </div>
      )
    }
  };

  if (!type || !content[type]) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2>{content[type].title}</h2>
          <button className="legal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="legal-modal-body">
          {content[type].text}
        </div>
      </div>
    </div>
  );
};
