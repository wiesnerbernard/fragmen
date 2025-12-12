<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .header {
            border-bottom: 2px solid #e5e5e5;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .rss-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: #ff6600;
            border-radius: 4px;
            margin-right: 10px;
            vertical-align: middle;
            position: relative;
          }
          
          .rss-icon::before {
            content: "";
            position: absolute;
            bottom: 4px;
            left: 4px;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
          }
          
          h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #111;
          }
          
          .description {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
          }
          
          .subscribe-info {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 30px;
          }
          
          .subscribe-info strong {
            color: #0369a1;
          }
          
          .subscribe-info p {
            margin-top: 8px;
            font-size: 14px;
            color: #0c4a6e;
          }
          
          .subscribe-info code {
            background: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: "SF Mono", Monaco, Consolas, monospace;
            font-size: 13px;
            border: 1px solid #bae6fd;
          }
          
          .item {
            border-bottom: 1px solid #e5e5e5;
            padding: 24px 0;
          }
          
          .item:last-child {
            border-bottom: none;
          }
          
          .item h2 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          
          .item h2 a {
            color: #111;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          .item h2 a:hover {
            color: #0066cc;
          }
          
          .item-meta {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
          }
          
          .category {
            display: inline-block;
            background: #f3f4f6;
            color: #374151;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 500;
            margin-right: 8px;
          }
          
          .date {
            color: #999;
            font-size: 13px;
          }
          
          .item p {
            color: #555;
            line-height: 1.7;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          
          @media (max-width: 640px) {
            body {
              padding: 10px;
            }
            
            .container {
              padding: 20px;
            }
            
            h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>
              <span class="rss-icon"></span>
              <xsl:value-of select="/rss/channel/title"/>
            </h1>
            <p class="description">
              <xsl:value-of select="/rss/channel/description"/>
            </p>
          </div>
          
          <div class="subscribe-info">
            <strong>📡 This is an RSS feed</strong>
            <p>Copy this URL into your favorite RSS reader to subscribe: <code><xsl:value-of select="/rss/channel/atom:link[@rel='self']/@href"/></code></p>
          </div>
          
          <div class="items">
            <xsl:for-each select="/rss/channel/item">
              <div class="item">
                <h2>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <div class="item-meta">
                  <span class="category">
                    <xsl:value-of select="category"/>
                  </span>
                  <xsl:if test="pubDate">
                    <span class="date">
                      <xsl:value-of select="pubDate"/>
                    </span>
                  </xsl:if>
                </div>
                <p>
                  <xsl:value-of select="description"/>
                </p>
              </div>
            </xsl:for-each>
          </div>
          
          <div class="footer">
            <p>Generated from <a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/link"/></a></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
